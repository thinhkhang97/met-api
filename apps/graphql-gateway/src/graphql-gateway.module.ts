import { HealthCheck, JwtAuthorizationMiddleware } from '@lib/shared';
import { WrappedGraphqlModule } from '@lib/shared/modules/wapped-graphql/wrapped-graphql.module';
import { WrappedJwtModule } from '@lib/shared/modules/wrapped-jwt/wrapped-jwt.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/graphql-gateway/src/.env',
    }),
    WrappedJwtModule.registerAsync(),
    WrappedGraphqlModule.forGateway(),
  ],
})
export class GraphqlGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HealthCheck).forRoutes('/health');
    consumer.apply(JwtAuthorizationMiddleware).forRoutes('/graphql');
  }
}
