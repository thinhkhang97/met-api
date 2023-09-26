import { Provider } from '@nestjs/common';

import { BroadcastToMeetingAfterMemberJoinedEventHandler } from './broadcast-to-meeting-after-member-joined.event-handler';
import { BroadcastToMeetingAfterMemberLeftEventHandler } from './broadcast-to-meeting-after-member-left.event-handler';
import { BroadcastToMeetingAfterTaskAddedEventHandler } from './broadcast-to-meeting-after-task-added.event-handler';
import { BroadcastToMeetingAfterTaskEstimationUpdatedFinalEstimationEventHandler } from './broadcast-to-meeting-after-task-estimation-updated-final-estimation.event-handler';
import { BroadcastToMeetingAfterTaskFinishedEstimationEventHandler } from './broadcast-to-meeting-after-task-finished-estimation.event-handler';
import { BroadcastToMeetingAfterTaskRemovedEventHandler } from './broadcast-to-meeting-after-task-removed.event-handler';
import { BroadcastToMeetingAfterTaskStartEstimationEventHandler } from './broadcast-to-meeting-after-task-start-estimation.event-handler';
import { BroadcastToMeetingAfterTaskUpdatedEventHandler } from './broadcast-to-meeting-after-task-updated.event-handler';
import { BroadcastToMeetingMemberUpdatedTaskEstimationEventHandler } from './broadcast-to-meeting-member-updated-task-estimation.event-handler';

export const eventHandlers: Provider[] = [
  BroadcastToMeetingAfterMemberJoinedEventHandler,
  BroadcastToMeetingAfterMemberLeftEventHandler,
  BroadcastToMeetingAfterTaskAddedEventHandler,
  BroadcastToMeetingAfterTaskUpdatedEventHandler,
  BroadcastToMeetingAfterTaskRemovedEventHandler,
  BroadcastToMeetingMemberUpdatedTaskEstimationEventHandler,
  BroadcastToMeetingAfterTaskStartEstimationEventHandler,
  BroadcastToMeetingAfterTaskFinishedEstimationEventHandler,
  BroadcastToMeetingAfterTaskEstimationUpdatedFinalEstimationEventHandler,
];
