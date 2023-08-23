import { MeetingInfrastructureModule } from '@lib/meeting/infrastructure';
import { Module } from '@nestjs/common';

import { commands } from '../commands';

@Module({
  imports: [MeetingInfrastructureModule],
  providers: [...commands],
})
export class MeetingApplicationModule {}
