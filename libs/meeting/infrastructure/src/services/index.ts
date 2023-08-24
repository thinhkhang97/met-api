import { GroupService } from '@lib/meeting/domain';
import { Provider } from '@nestjs/common';

import { EstimationMeetingService } from './estimation-meeting.service';
import { GroupServiceImpl } from './group.service';

export const services: Provider[] = [
  EstimationMeetingService,
  { provide: GroupService, useClass: GroupServiceImpl },
];
