import { Provider } from '@nestjs/common';

import { CreateEstimationMeetingCommandHandler } from './create-estimation-meeting/create-estimation-meeting.command-handler';
import { JoinMeetingCommandHandler } from './join-meeting/join-meeting.command-handler';
import { LeaveMeetingCommandHandler } from './leave-meeting/leave-meeting.command-handler';

export * from './create-estimation-meeting/create-estimation-meeting.command';
export * from './join-meeting/join-meeting.command';
export * from './leave-meeting/leave-meeting.command';

export const commands: Provider[] = [
  CreateEstimationMeetingCommandHandler,
  JoinMeetingCommandHandler,
  LeaveMeetingCommandHandler,
];
