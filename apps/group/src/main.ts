import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { GroupModule } from './group.module';

async function bootstrap() {
  const app = await NestFactory.create(GroupModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 3012 },
  });
  await app.startAllMicroservices();
  await app.listen(3002);
}

bootstrap();
