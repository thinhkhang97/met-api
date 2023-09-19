import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { GraphqlGatewayModule } from './graphql-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlGatewayModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();
  app.enableCors({ origin: '*' });
  await app.listen(443);
  logger.log(
    `Started successfully, env: ${configService.get(
      'NODE_ENV',
    )}, env: ${configService.get('API_KEY')}, env: ${configService.get(
      'IDENTITY_SUBGRAPH',
    )}, env: ${configService.get('GROUP_SUBGRAPH')}, env: ${configService.get(
      'MEETING_SUBGRAPH',
    )}`,
  );
}

bootstrap();
