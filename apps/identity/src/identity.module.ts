import { UserGraphqlUiModule } from '@lib/user/graphql-ui';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  ],
})
export class IdentityModule {}
