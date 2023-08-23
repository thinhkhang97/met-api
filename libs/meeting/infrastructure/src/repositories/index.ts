import {
  EstimationMeetingRepository,
  TaskEstimationRepository,
} from '@lib/meeting/domain';
import { Provider } from '@nestjs/common';

import { EstimationMeetingRepositoryImpl } from './estimation-meeting.repository';
import { TaskEstimationRepositoryImpl } from './task-estimation.repository';

export const repositories: Provider[] = [
  {
    provide: EstimationMeetingRepository,
    useClass: EstimationMeetingRepositoryImpl,
  },
  {
    provide: TaskEstimationRepository,
    useClass: TaskEstimationRepositoryImpl,
  },
];
