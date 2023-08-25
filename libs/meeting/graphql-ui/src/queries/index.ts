import { Provider } from '@nestjs/common';

import { EstimationMeetingQuery } from './estimation-meeting.query';

export const queries: Provider[] = [EstimationMeetingQuery];
