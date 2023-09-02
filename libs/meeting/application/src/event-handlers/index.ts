import { Provider } from '@nestjs/common';

import { BroadcastToMeetingAfterMemberJoinedEventHandler } from './broadcast-to-meeting-after-member-joined.event-handler';
import { BroadcastToMeetingAfterMemberLeftEventHandler } from './broadcast-to-meeting-after-member-left.event-handler';
import { BroadcastToMeetingAfterTaskAddedEventHandler } from './broadcast-to-meeting-after-task-added.event-handler';
import { BroadcastToMeetingAfterTaskRemovedEventHandler } from './broadcast-to-meeting-after-task-removed.event-handler';
import { BroadcastToMeetingAfterTaskUpdatedEventHandler } from './broadcast-to-meeting-after-task-updated.event-handler';

export const eventHandlers: Provider[] = [
  BroadcastToMeetingAfterMemberJoinedEventHandler,
  BroadcastToMeetingAfterMemberLeftEventHandler,
  BroadcastToMeetingAfterTaskAddedEventHandler,
  BroadcastToMeetingAfterTaskUpdatedEventHandler,
  BroadcastToMeetingAfterTaskRemovedEventHandler,
];
