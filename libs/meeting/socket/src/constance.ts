export const IDENTITY_INTERNAL_SERVICE = 'IDENTITY_INTERNAL_SERVICE';
export const MEETING_INTERNAL_SERVICE = 'MEETING_INTERNAL_SERVICE';

export enum MeetingCacheKey {
  MEMBER_REQUEST_JOIN = 'member_request_join',
  CLIENT_MEMBER = 'client_member',
  MEETING_MEMBERS = 'meeting_members',
}

export enum RoomKey {
  MEETING = 'meeting',
}

export enum EventName {
  MEMBER_JOINED = 'member_joined',
  MEMBER_LEFT = 'member_left',
}
