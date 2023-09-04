import { MEETING_QUEUE_SERVICE } from '@lib/meeting/application/constance';
import { MeetingInfrastructureModule } from '@lib/meeting/infrastructure';
import { IoredisModule } from '@lib/shared';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { commands } from '../commands';
import { eventHandlers } from '../event-handlers';
import { queries } from '../queries';

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
    ClientsModule.registerAsync([
      {
        name: MEETING_QUEUE_SERVICE,
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
    ]),
    MeetingInfrastructureModule,
  ],
  providers: [...commands, ...queries, ...eventHandlers],
})
export class MeetingApplicationModule {}
