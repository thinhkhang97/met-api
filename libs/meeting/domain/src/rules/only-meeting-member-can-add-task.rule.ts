import { MemberWatchedList } from '@lib/meeting/domain';
import { BaseRule, CUID } from '@lib/shared';

export class OnlyMeetingMemberCanAddTaskRule extends BaseRule {
  constructor(
    private readonly _meetingMember: MemberWatchedList,
    private readonly _memberId: CUID,
  ) {
    super();
  }

  getErrorMessage(): string {
    return 'only_meeting_can_add_task_rule';
  }

  isFailed(): boolean {
    return !this._meetingMember.findOneByMemberId(this._memberId);
  }
}
