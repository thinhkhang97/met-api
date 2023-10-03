import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { GraphqlGatewayModule } from './graphql-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlGatewayModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();
  const isDevelopment = configService.get('NODE_ENV') === 'development';
  app.enableCors({ origin: '*' });
  await app.listen(isDevelopment ? 3000 : 443);
  logger.log(`Started successfully, env: ${configService.get('NODE_ENV')}`);
}

bootstrap();
