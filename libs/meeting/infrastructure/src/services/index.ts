import { EstimationMeetingService, GroupService } from '@lib/meeting/domain';
import { Provider } from '@nestjs/common';

import { EstimationMeetingServiceImpl } from './estimation-meeting.service';
import { GroupServiceImpl } from './group.service';

export const services: Provider[] = [
  { provide: EstimationMeetingService, useClass: EstimationMeetingServiceImpl },
  { provide: GroupService, useClass: GroupServiceImpl },
];
