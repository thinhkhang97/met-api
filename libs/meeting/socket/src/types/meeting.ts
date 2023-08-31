import { MemberRole } from '@lib/meeting/domain/constance';

export interface Member {
  meetingId: string;
  memberId: string;
  role?: MemberRole;
  name?: string;
}

export interface CachedMember extends Member {
  clientId: string;
}
