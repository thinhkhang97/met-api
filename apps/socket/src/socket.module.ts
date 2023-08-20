import { PlaningMeetingSocketGateway } from '@lib/meeting/socket';
import { WrappedCacheModule } from '@lib/shared/modules/wrapped-cache/wrapped-cache.module';
import { WrappedJwtModule } from '@lib/shared/modules/wrapped-jwt/wrapped-jwt.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    WrappedJwtModule.registerAsync(),
    WrappedCacheModule.forRedis('./apps/socket/src/.env'),
  ],
  providers: [PlaningMeetingSocketGateway],
})
export class SocketModule {}
