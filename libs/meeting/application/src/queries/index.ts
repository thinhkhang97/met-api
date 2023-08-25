import { Provider } from '@nestjs/common';

import { GetEstimationMeetingQueryHandler } from './get-estimation-meeting/get-estimation-meeting.query-handler';

export * from './get-estimation-meeting/get-estimation-meeting.query';

export const queries: Provider[] = [GetEstimationMeetingQueryHandler];
