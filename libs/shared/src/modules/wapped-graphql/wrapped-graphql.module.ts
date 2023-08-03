import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
  ApolloGatewayDriver,
} from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlModuleOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';

export class WrappedGraphqlModule {
  public static forGateway(options?: GqlModuleOptions) {
    return GraphQLModule.forRootAsync({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => ({
        ...options,
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'identity',
                url: _configService.getOrThrow<string>('IDENTITY_SUBGRAPH'),
              },
              {
                name: 'group',
                url: _configService.getOrThrow<string>('GROUP_SUBGRAPH'),
              },
            ],
          }),
          subscription: false,
          buildService({ url }) {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }) {
                request.http?.headers.set('user', context?.req?.user);
              },
            });
          },
        },
      }),
    });
  }

  public static forSubgraph(options?: GqlModuleOptions) {
    return GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      ...options,
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    });
  }
}
