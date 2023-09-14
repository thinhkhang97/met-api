import { Nullable } from '@lib/shared';

export interface MemberEstimationDto {
  meetingMemberId: string;
  taskEstimationId: string;
  estimationValue: Nullable<number>;
}
