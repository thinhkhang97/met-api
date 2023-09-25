import { MemberRole } from '@lib/meeting/domain/constance';
import { Nullable } from '@lib/shared';

export interface Member {
  id?: string;
  meetingId: string;
  memberId: string;
  role?: MemberRole;
  name?: string;
}

export interface CachedMember extends Member {
  clientId: string;
}

export interface TaskEstimation {
  meetingId: string;
  taskEstimationId: string;
  title: string;
  description: Nullable<string>;
}
