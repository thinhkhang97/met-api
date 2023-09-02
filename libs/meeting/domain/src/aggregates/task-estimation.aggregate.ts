import { EstimationTaskTitle } from '@lib/meeting/domain/value-objects';
import { AggregateRoot, CUID, Nullable } from '@lib/shared';

import { TaskEstimationStatus } from '../constance';
import { MemberEstimation } from '../entities';

interface CreateTaskEstimationProps {
  /**
   * Meeting id
   */
  meetingId: CUID;

  /**
   * Title of task
   */
  title: EstimationTaskTitle;

  /**
   * The description for the task
   */
  description: Nullable<string>;
}

export interface TaskEstimationProps extends CreateTaskEstimationProps {
  /**
   * Task was removed or still in the meeting
   */
  status: TaskEstimationStatus;

  /**
   * The members attended to the estimation
   */
  memberEstimations: MemberEstimation[];

  /**
   * Final estimation for the task
   */
  averageEstimation: Nullable<number>;
}

export class TaskEstimation extends AggregateRoot<TaskEstimationProps> {
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
      averageEstimation: null,
      memberEstimations: [],
    });
  }

  public updateTitle(title: EstimationTaskTitle) {
    this._props.title = title;
    this.update();
  }

  public updateDescription(description: string) {
    this._props.description = description;
    this.update();
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
        taskEstimationId: this.id as CUID,
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
