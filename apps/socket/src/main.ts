import { NestFactory } from '@nestjs/core';

import { SocketModule } from './socket.module';

async function bootstrap() {
  const app = await NestFactory.create(SocketModule);
  app.enableCors({ origin: '*' });
  await app.listen(80);
}

bootstrap();
