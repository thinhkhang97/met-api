import { PlaningMeetingSocketGateway } from '@lib/meeting/socket';
import { WrappedCacheModule } from '@lib/shared/modules/wrapped-cache/wrapped-cache.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [WrappedCacheModule.forRedis('./apps/socket/src/.env')],
  providers: [PlaningMeetingSocketGateway],
})
export class SocketModule {}
