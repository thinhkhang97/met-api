import { PlaningMeetingSocketGateway } from '@lib/meeting/socket';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [PlaningMeetingSocketGateway],
})
export class SocketModule {}
