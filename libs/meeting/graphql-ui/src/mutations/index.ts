import { Provider } from '@nestjs/common';

import { EstimationMeetingMutation } from './estimation-meeting.mutation';
import { EstimationTaskMutation } from './estimation-task.mutation';

export const mutations: Provider[] = [
  EstimationMeetingMutation,
  EstimationTaskMutation,
];
