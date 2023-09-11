import { MemberUpdatedTaskEstimationEvent } from '@lib/meeting/domain/events';
import { OnlyInEstimatingTaskCanBeEstimatedRule } from '@lib/meeting/domain/rules';
import { TaskTitle } from '@lib/meeting/domain/value-objects';
import { AggregateRoot, CUID, Nullable, RuleValidator } from '@lib/shared';

import { TaskEstimationStatus } from '../constance';
import { MemberEstimation } from '../entities';
import { MemberEstimationWatchedList } from '../watched-list';

interface CreateTaskEstimationProps {
  /**
   * Meeting id
   */
  meetingId: CUID;

  /**
   * Title of task
   */
  title: TaskTitle;

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
  memberEstimations: MemberEstimationWatchedList;

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
      memberEstimations: new MemberEstimationWatchedList(),
    });
  }

  public updateTitle(title: TaskTitle) {
    this._props.title = title;
    this.update();
  }

  public updateDescription(description: Nullable<string>) {
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
    RuleValidator.validate(
      new OnlyInEstimatingTaskCanBeEstimatedRule(this.status),
    );
    let memberEstimation =
      this.memberEstimations.findOneByMeetingMemberId(meetingMemberId);
    if (!memberEstimation) {
      memberEstimation = MemberEstimation.create({
        meetingMemberId,
        estimation: value,
        taskEstimationId: this.id as CUID,
      });
      this._props.memberEstimations.add(memberEstimation);
    } else {
      this._props.memberEstimations.update(memberEstimation);
    }
    this.apply(
      new MemberUpdatedTaskEstimationEvent({
        aggregateId: this.id,
        meetingMemberId,
      }),
    );
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
   * Start giving estimation for a task
   */
  public startEstimating() {
    this._props.status = TaskEstimationStatus.IN_ESTIMATING;
    this._props.memberEstimations.resetEstimation();
    this.update();
  }

  /**
   * Finish giving estimation for a task
   */
  public finishEstimating() {
    this._props.status = TaskEstimationStatus.ESTIMATED;
    this.updateFinalEstimation();
    this.update();
  }

  /**
   * Update final average estimation for the task
   */
  public updateFinalEstimation() {
    const numberOfValue = this.memberEstimations.numberOfValue;
    if (numberOfValue < 1) {
      this._props.averageEstimation = null;
    } else {
      this._props.averageEstimation =
        this.memberEstimations.sumVoterValue /
        this.memberEstimations.numberOfValue;
    }
    this.update();
  }
}
