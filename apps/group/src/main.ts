import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { GroupModule } from './group.module';

async function bootstrap() {
  const app = await NestFactory.create(GroupModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3012,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3002);
  logger.log(
    `Started successfully, env: ${configService.get(
      'ENV',
    )}, env: ${configService.get(
      'IDENTITY_INTERNAL_SERVICE',
    )}, env: ${configService.get('INTERNAL_API_KEY')},`,
  );
}

bootstrap();
