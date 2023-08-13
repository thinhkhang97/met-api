import { AllExceptionsFilter } from '@lib/shared';
import { UserGraphqlUiModule } from '@lib/user/graphql-ui';
import { UserRestUiModule } from '@lib/user/rest-ui';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/identity/src/.env',
      // validationSchema: Joi.object({
      //   KEY: Joi.string().required(),
      //   DB: Joi.string().required(),
      // }),
    }),
    UserGraphqlUiModule,
    UserRestUiModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class IdentityModule {}
