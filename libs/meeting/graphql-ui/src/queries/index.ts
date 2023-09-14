import { Provider } from '@nestjs/common';

import { EstimationMeetingQuery } from './estimation-meeting.query';
import { TaskEstimationQuery } from './task-estimation.query';

export const queries: Provider[] = [
  EstimationMeetingQuery,
  TaskEstimationQuery,
];
