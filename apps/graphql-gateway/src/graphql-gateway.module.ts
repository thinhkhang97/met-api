import { WrappedGraphqlModule } from '@lib/shared/modules/wapped-graphql/wrapped-graphql.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/graphql-gateway/src/.env',
    }),
    WrappedGraphqlModule.forGateway(),
  ],
})
export class GraphqlGatewayModule {}
