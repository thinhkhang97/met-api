import { MeetingInfrastructureModule } from '@lib/meeting/infrastructure';
import { Module } from '@nestjs/common';

import { commands } from '../commands';
import { eventHandlers } from '../event-handlers';
import { queries } from '../queries';

@Module({
  imports: [MeetingInfrastructureModule],
  providers: [...commands, ...queries, ...eventHandlers],
})
export class MeetingApplicationModule {}
