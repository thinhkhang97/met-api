import { EstimationMeeting } from '@lib/meeting/domain';
import { CUID, Nullable } from '@lib/shared';

import { MeetingService } from './meeting.service';

export abstract class EstimationMeetingService extends MeetingService<EstimationMeeting> {
  public abstract updateMemberEstimation(
    meetingId: CUID,
    meetingMemberId: CUID,
    taskEstimationId: CUID,
    estimationValue: Nullable<number>,
  ): Promise<void>;
}
