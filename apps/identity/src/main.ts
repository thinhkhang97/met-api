import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { IdentityModule } from './identity.module';

async function bootstrap() {
  const app = await NestFactory.create(IdentityModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();
  const isDevelopment = configService.get('NODE_ENV') === 'development';
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: isDevelopment ? 'localhost' : '0.0.0.0',
      port: 3011,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
  logger.log(`Started successfully, env: ${configService.get('NODE_ENV')},`);
}

bootstrap();
