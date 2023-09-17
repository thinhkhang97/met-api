import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { IdentityModule } from './identity.module';

async function bootstrap() {
  const app = await NestFactory.create(IdentityModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3011,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
  logger.log(
    `Started successfully, env: ${configService.get(
      'NODE_ENV',
    )}, env: ${configService.get('JWT_KEY')}, env: ${configService.get(
      'INTERNAL_API_KEY',
    )},`,
  );
}

bootstrap();
