import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { MeetingModule } from './meeting.module';

async function bootstrap() {
  const app = await NestFactory.create(MeetingModule);
  const configService = app.get(ConfigService);

  const user = configService.getOrThrow('RABBITMQ_USER');
  const password = configService.getOrThrow('RABBITMQ_PASSWORD');
  const host = configService.getOrThrow('RABBITMQ_HOST');
  const queueName = configService.getOrThrow('RABBITMQ_QUEUE_NAME');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      queueOptions: {
        durable: false,
      },
    },
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3013,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3003);
}

bootstrap();
