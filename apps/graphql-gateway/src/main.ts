import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { GraphqlGatewayModule } from './graphql-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlGatewayModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();
  app.enableCors({ origin: '*' });
  await app.listen(3000);
  logger.log('Started successfully, env: ' + configService.get('ENV'));
}

bootstrap();
