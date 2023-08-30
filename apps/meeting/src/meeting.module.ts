import { MeetingGraphqlUiModule } from '@lib/meeting/graphql-ui';
import { MeetingRmqUiModule } from '@lib/meeting/rmq-ui';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/meeting/src/.env',
    }),
    MeetingGraphqlUiModule,
    MeetingRmqUiModule,
  ],
})
export class MeetingModule {}
