import { NestFactory } from '@nestjs/core';

import { MeetingModule } from './meeting.module';

async function bootstrap() {
  const app = await NestFactory.create(MeetingModule);
  await app.listen(3003);
}

bootstrap();
