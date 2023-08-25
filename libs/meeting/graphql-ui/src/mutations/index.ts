import { Provider } from '@nestjs/common';

import { EstimationMeetingMutation } from './estimation-meeting.mutation';

export const mutations: Provider[] = [EstimationMeetingMutation];
