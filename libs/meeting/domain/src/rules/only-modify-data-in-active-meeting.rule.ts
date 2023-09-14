import { MeetingStatus } from '@lib/meeting/domain/constance';
import { BaseRule } from '@lib/shared';

export class OnlyModifyDataInActiveMeetingRule extends BaseRule {
  constructor(private readonly _meetingStatus: string) {
    super();
  }

  getErrorMessage(): string {
    return 'only_modify_data_in_active_meeting';
  }

  isFailed(): boolean {
    return this._meetingStatus === MeetingStatus.ENDED;
  }
}
