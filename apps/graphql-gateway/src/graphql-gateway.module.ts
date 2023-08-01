import { IntrospectAndCompose } from '@apollo/gateway';
import { AuthGuard } from '@lib/shared';
import { WrappedJwtModule } from '@lib/shared/modules/wrapped-jwt/wrapped-jwt.module';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/graphql-gateway/src/.env',
    }),
    WrappedJwtModule.registerAsync(),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'identity', url: 'http://localhost:3001/graphql' },
            { name: 'group', url: 'http://localhost:3002/graphql' },
          ],
        }),
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class GraphqlGatewayModule {}
