export const IDENTITY_INTERNAL_SERVICE = 'IDENTITY_INTERNAL_SERVICE';
export const MEETING_INTERNAL_SERVICE = 'MEETING_INTERNAL_SERVICE';

export enum MeetingCacheKey {
  MEMBER_REQUEST_JOIN = 'member_request_join',
  CLIENT_MEMBER = 'client_member',
  MEETING_ESTIMATE_TASK = 'estimate_task',
  MEETING_MEMBERS = 'meeting_members',
}

export enum RoomKey {
  MEETING = 'meeting',
}

export enum MeetingMessageName {
  REQUEST_JOINED = 'meeting:request_join',
  RECEIVED_REQUEST = 'meeting:received_request',
  MEMBER_JOINED = 'meeting:member_joined',
  MEMBER_LEFT = 'meeting:member_left',
  MEMBER_UPDATE_ESTIMATION_VALUE = 'meeting:member_update_estimation_value',
  ESTIMATION_TASK_ADDED = 'meeting:estimation_task_added',
  ESTIMATION_TASK_UPDATED = 'meeting:estimation_task_updated',
  ESTIMATION_TASK_REMOVED = 'meeting:estimation_task_removed',
  ESTIMATION_TASK_STARTED = 'meeting:estimation_task_started',
  ESTIMATION_TASK_FINISHED = 'meeting:estimation_task_finished',
}
