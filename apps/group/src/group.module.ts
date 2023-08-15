import { GroupGraphqlUIModule } from '@lib/group/graphql-ui';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/group/src/.env',
    }),
    GroupGraphqlUIModule,
  ],
})
export class GroupModule {}
