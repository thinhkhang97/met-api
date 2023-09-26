import { EstimationMeeting, TaskEstimation } from '@lib/meeting/domain';
import { MemberRole } from '@lib/meeting/domain/constance';
import { CUID, Nullable } from '@lib/shared';

import { TaskTitle } from '../value-objects';
import { MeetingService } from './meeting.service';

export abstract class EstimationMeetingService extends MeetingService<EstimationMeeting> {
  public abstract addTaskEstimation(
    userId: CUID,
    meetingId: CUID,
    title: TaskTitle,
    description: Nullable<string>,
  ): Promise<TaskEstimation>;

  public abstract updateMemberEstimation(
    meetingId: CUID,
    meetingMemberId: CUID,
    taskEstimationId: CUID,
    estimationValue: Nullable<number>,
    reason: Nullable<string>,
  ): Promise<void>;

  public abstract startEstimateTask(
    meetingId: CUID,
    taskEstimationId: CUID,
  ): Promise<void>;

  public abstract finishEstimateTask(
    meetingId: CUID,
    taskEstimationId: CUID,
  ): Promise<void>;

  public abstract updateMemberRole(
    meetingId: CUID,
    userId: CUID,
    role: MemberRole,
  );

  public abstract updateFinalEstimation(
    meetingId: CUID,
    userId: CUID,
    taskEstimationId: CUID,
    finalEstimation: Nullable<number>,
  );
}
