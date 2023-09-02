import { TaskEstimationWatchedList } from '@lib/meeting/domain';
import { BaseRule, CUID } from '@lib/shared';

export class TaskToUpdateMustBeInMeetingRule extends BaseRule {
  constructor(
    private readonly _meetingTask: TaskEstimationWatchedList,
    private readonly _taskId: CUID,
  ) {
    super();
  }

  getErrorMessage(): string {
    return 'task_to_update_must_be_in_meeting';
  }

  isFailed(): boolean {
    return !this._meetingTask.findOneById(this._taskId);
  }
}
