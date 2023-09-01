import { Provider } from '@nestjs/common';

import { GetEstimationMeetingQueryHandler } from './get-estimation-meeting/get-estimation-meeting.query-handler';
import { GetEstimationMeetingsQueryHandler } from './get-estimation-meetings/get-estimation-meetings.query-handler';

export * from './get-estimation-meeting/get-estimation-meeting.query';
export * from './get-estimation-meetings/get-estimation-meetings.query-handler';

export const queries: Provider[] = [
  GetEstimationMeetingQueryHandler,
  GetEstimationMeetingsQueryHandler,
];
