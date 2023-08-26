import { IoredisModule } from '@lib/shared';
import { WrappedCacheModule } from '@lib/shared/modules/wrapped-cache/wrapped-cache.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PlaningMeetingSocketGateway } from '../gateway';

@Module({
  imports: [
    IoredisModule.registerAsync({
      useFactory: (_configService: ConfigService) => {
        return {
          username: _configService.getOrThrow('REDIS_USERNAME'),
          host: _configService.getOrThrow('REDIS_HOST'),
          port: _configService.getOrThrow('REDIS_PORT'),
          password: _configService.getOrThrow('REDIS_PASSWORD'),
        };
      },
      inject: [ConfigService],
    }),
    WrappedCacheModule.forRedis(),
  ],
  providers: [PlaningMeetingSocketGateway],
  exports: [PlaningMeetingSocketGateway],
})
export class MeetingSocketModule {}
