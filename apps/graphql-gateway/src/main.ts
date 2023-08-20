import { NestFactory } from '@nestjs/core';

import { GraphqlGatewayModule } from './graphql-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlGatewayModule);
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}

bootstrap();
