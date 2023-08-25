import { MeetingInfrastructureModule } from '@lib/meeting/infrastructure';
import { Module } from '@nestjs/common';

import { commands } from '../commands';
import { queries } from '../queries';

@Module({
  imports: [MeetingInfrastructureModule],
  providers: [...commands, ...queries],
})
export class MeetingApplicationModule {}
