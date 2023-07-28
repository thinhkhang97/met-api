import { NestFactory } from '@nestjs/core';
import { IndentityModule } from './indentity.module';

async function bootstrap() {
  const app = await NestFactory.create(IndentityModule);
  await app.listen(3000);
}
bootstrap();
