import { TaskEstimation } from '@lib/meeting/domain';
import { TaskEstimationStatus } from '@lib/meeting/domain/constance';
import { BaseRule } from '@lib/shared';

export class TaskToUpdateMustBeActiveRule extends BaseRule {
  constructor(private readonly _task: TaskEstimation) {
    super();
  }

  getErrorMessage(): string {
    return 'task_to_update_must_be_in_meeting';
  }

  isFailed(): boolean {
    return this._task.status !== TaskEstimationStatus.ACTIVE;
  }
}
