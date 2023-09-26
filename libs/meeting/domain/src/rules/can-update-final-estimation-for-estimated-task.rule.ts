import { TaskEstimation } from '@lib/meeting/domain';
import { TaskEstimationStatus } from '@lib/meeting/domain/constance';
import { BaseRule } from '@lib/shared';

export class CanUpdateFinalEstimationForEstimatedTaskRule extends BaseRule {
  constructor(private readonly _taskEstimation: TaskEstimation) {
    super();
  }

  getErrorMessage(): string {
    return 'can_update_final_estimation_for_estimated_task';
  }

  isFailed(): boolean {
    return this._taskEstimation.status !== TaskEstimationStatus.ESTIMATED;
  }
}
