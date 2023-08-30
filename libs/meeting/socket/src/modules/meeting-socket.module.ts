import { IoredisModule } from '@lib/shared';
import { WrappedCacheModule } from '@lib/shared/modules/wrapped-cache/wrapped-cache.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { cacheServices } from '../cache';
import {
  IDENTITY_INTERNAL_SERVICE,
  MEETING_INTERNAL_SERVICE,
} from '../constance';
import { eventHandlers } from '../event-handlers';
import { EstimationMeetingSocketGateway } from '../gateway';
import { IdentityService } from '../services';

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
    ClientsModule.registerAsync([
      {
        name: MEETING_INTERNAL_SERVICE,
        useFactory: (_configService: ConfigService) => {
          const user = _configService.getOrThrow('RABBITMQ_USER');
          const password = _configService.getOrThrow('RABBITMQ_PASSWORD');
          const host = _configService.getOrThrow('RABBITMQ_HOST');
          const queueName = _configService.getOrThrow('RABBITMQ_QUEUE_NAME');

          return {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${user}:${password}@${host}`],
              queue: queueName,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
      },
      {
        name: IDENTITY_INTERNAL_SERVICE,
        useFactory: (_configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: _configService.getOrThrow('IDENTITY_MS_HOST'),
              port: _configService.getOrThrow('IDENTITY_MS_PORT'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    ...cacheServices,
    ...eventHandlers,
    IdentityService,
    EstimationMeetingSocketGateway,
  ],
  exports: [EstimationMeetingSocketGateway],
})
export class MeetingSocketModule {}
