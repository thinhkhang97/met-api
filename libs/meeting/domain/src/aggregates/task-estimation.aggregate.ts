import { AggregateRoot, CUID, Nullable } from '@lib/shared';

import { TaskEstimationStatus } from '../constance';
import { MemberEstimation, Task } from '../entities';

interface CreateTaskEstimationProps {
  /**
   * The task need to be estimated
   */
  task: Task;

  /**
   * The members attended to the estimation
   */
  memberEstimations: MemberEstimation[];

  /**
   * Final estimation for the task
   */
  averageEstimation: Nullable<number>;
}

export interface TaskEstimationProps extends CreateTaskEstimationProps {
  status: TaskEstimationStatus;
}

export class TaskEstimation extends AggregateRoot<TaskEstimationProps> {
  public get task() {
    return this._props.task;
  }

  public get status() {
    return this._props.status;
  }

  public get memberEstimations() {
    return this._props.memberEstimations;
  }

  public static create(props: CreateTaskEstimationProps) {
    return new TaskEstimation({
      ...props,
      status: TaskEstimationStatus.ACTIVE,
    });
  }

  /**
   * Update the member's estimation for the task
   * @param meetingMemberId
   * @param value
   */
  public updateMemberEstimation(
    meetingMemberId: CUID,
    value: Nullable<number>,
  ) {
    let memberEstimation = this.memberEstimations.find((memberEstimation) =>
      memberEstimation.meetingMemberId.equals(meetingMemberId),
    );
    if (!memberEstimation) {
      memberEstimation = MemberEstimation.create({
        meetingMemberId,
        estimation: value,
      });
      this._props.memberEstimations.push(memberEstimation);
    } else {
      memberEstimation.updateEstimation(value);
    }
    this.updateFinalEstimation();
    this.update();
  }

  validate() {
    return;
  }

  /**
   * Update task estimation status
   * @param status
   */
  public updateStatus(status: TaskEstimationStatus) {
    this._props.status = status;
    this.update();
  }

  /**
   * Update final average estimation for the task
   * @private
   */
  private updateFinalEstimation() {
    let sum = 0;
    this.memberEstimations.forEach(
      (memberEstimation) => (sum += memberEstimation.estimation || 0),
    );
    this._props.averageEstimation = sum / this.memberEstimations.length;
  }
}
