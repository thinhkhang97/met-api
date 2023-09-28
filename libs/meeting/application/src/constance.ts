export enum MeetingChannel {
  ESTIMATION_MEETING = 'estimation_meeting',
}

export enum MeetingEventName {
  MEMBER_JOINED = 'member_joined',
  MEMBER_LEFT = 'member_left',
  MEMBER_UPDATED_TASK_ESTIMATION = 'member_updated_task_estimation',
  ESTIMATION_TASK_ADDED = 'estimation_task_added',
  ESTIMATION_TASK_UPDATED = 'estimation_task_updated',
  ESTIMATION_TASK_REMOVED = 'estimation_task_removed',
  ESTIMATION_TASK_STARTED = 'estimation_task_started',
  ESTIMATION_TASK_FINISHED = 'estimation_task_finished',
  ESTIMATION_TASK_UPDATED_FINAL_VALUE = 'estimation_task_updated_final_value',
}

export const MEETING_QUEUE_SERVICE = 'MEETING_QUEUE_SERVICE';
