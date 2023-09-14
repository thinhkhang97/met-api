import { BaseRule } from '@lib/shared';

import { TaskEstimationStatus } from '../constance';

export class OnlyInEstimatingTaskCanBeEstimatedRule extends BaseRule {
  constructor(private readonly _status: TaskEstimationStatus) {
    super();
  }

  getErrorMessage(): string {
    return 'only_in_estimating_task_can_be_estimated';
  }

  isFailed(): boolean {
    return this._status !== TaskEstimationStatus.IN_ESTIMATING;
  }
}
