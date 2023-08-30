import { MemberRole } from '@lib/meeting/domain/constance';

export interface Member {
  meetingId: string;
  memberId: string;
  role?: MemberRole;
  name?: string;
}

export interface WSMember extends Member {
  clientId: string;
}

export interface WMeeting {
  id: string;
  members: WSMember[];
}
