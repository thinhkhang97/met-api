import { Provider } from '@nestjs/common';

import { BroadcastToMeetingAfterMemberJoinedEventHandler } from './broadcast-to-meeting-after-member-joined.event-handler';
import { BroadcastToMeetingAfterMemberLeftEventHandler } from './broadcast-to-meeting-after-member-left.event-handler';

export const eventHandlers: Provider[] = [
  BroadcastToMeetingAfterMemberJoinedEventHandler,
  BroadcastToMeetingAfterMemberLeftEventHandler,
];
