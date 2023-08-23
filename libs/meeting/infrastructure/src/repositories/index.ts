import { EstimationMeetingRepository } from '@lib/meeting/domain';
import { Provider } from '@nestjs/common';

import { EstimationMeetingRepositoryImpl } from './estimation-meeting.repository';

export const repositories: Provider[] = [
  {
    provide: EstimationMeetingRepository,
    useClass: EstimationMeetingRepositoryImpl,
  },
];
