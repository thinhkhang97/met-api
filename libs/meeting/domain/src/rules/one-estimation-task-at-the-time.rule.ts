import { TaskEstimationWatchedList } from '@lib/meeting/domain';
import { BaseRule } from '@lib/shared';

export class OneEstimationTaskAtTheTimeRule extends BaseRule {
  constructor(private readonly _taskEstimation: TaskEstimationWatchedList) {
    super();
  }

  getErrorMessage(): string {
    return 'one_estimation_task_at_the_time';
  }

  isFailed(): boolean {
    return !!this._taskEstimation.currentInEstimatingTask;
  }
}
