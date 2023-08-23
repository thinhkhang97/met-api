import { Module } from '@nestjs/common';

import { commands } from '../commands';

@Module({
  providers: [...commands],
})
export class MeetingApplicationModule {}
