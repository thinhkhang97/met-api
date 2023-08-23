import { Provider } from '@nestjs/common';

import { CreateEstimationMeetingCommandHandler } from './create-estimation-meeting/create-estimation-meeting.command-handler';

export * from './create-estimation-meeting/create-estimation-meeting.command';

export const commands: Provider[] = [CreateEstimationMeetingCommandHandler];
