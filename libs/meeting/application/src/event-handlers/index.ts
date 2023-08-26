import { Provider } from '@nestjs/common';

import { BroadcastToMeetingAfterMemberJoinedEventHandler } from './broadcast-to-meeting-after-member-joined.event-handler';

export const eventHandlers: Provider[] = [
  BroadcastToMeetingAfterMemberJoinedEventHandler,
];
