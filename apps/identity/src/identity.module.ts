import { AllExceptionsFilter, HealthCheck } from '@lib/shared';
import { UserGraphqlUiModule } from '@lib/user/graphql-ui';
import { UserRestUiModule } from '@lib/user/rest-ui';
import { UserTcpUiModule } from '@lib/user/tcp-ui';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/identity/src/.env',
    }),
    UserGraphqlUiModule,
    UserRestUiModule,
    UserTcpUiModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class IdentityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HealthCheck);
  }
}
