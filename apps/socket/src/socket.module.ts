import { MeetingSocketModule } from '@lib/meeting/socket';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/socket/src/.env',
    }),
    MeetingSocketModule,
  ],
})
export class SocketModule {}
