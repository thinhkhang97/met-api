import { Provider } from '@nestjs/common';

import { MeetingMutation } from './meeting.mutation';

export const mutations: Provider[] = [MeetingMutation];
