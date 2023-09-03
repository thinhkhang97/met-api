import {
  TaskEstimationAddedEvent,
  TaskEstimationRemovedEvent,
  TaskEstimationUpdatedEvent,
} from '@lib/meeting/domain/events';
import { TaskTitle } from '@lib/meeting/domain/value-objects';
import { CUID, Nullable, RuleValidator } from '@lib/shared';

import { MeetingStatus, TaskEstimationStatus } from '../constance';
import {
  MeetingMemberNotFoundException,
  TaskEstimationNotFoundException,
} from '../exceptions';
import {
  OnlyMeetingMemberCanAddTaskRule,
  OnlyModifyDataInActiveMeetingRule,
  OnlyVoterCanEstimateRule,
  TaskToUpdateMustBeActiveRule,
} from '../rules';
import { MemberWatchedList, TaskEstimationWatchedList } from '../watched-list';
import { CreateMeetingProps, Meeting, MeetingProps } from './meeting.aggregate';
import { TaskEstimation } from './task-estimation.aggregate';

type CreateEstimationMeetingProps = CreateMeetingProps;

export interface EstimationMeetingProps extends MeetingProps {
  /**
   * Tasks need to be considered and estimated by the members in the meeting
   */
  taskEstimations: TaskEstimationWatchedList;
}

/**
 * Estimation is a meeting that everyone in a group plans, estimate the complex of tasks in the sprint by
 * giving the points, hours for each of them
 */
export class EstimationMeeting extends Meeting<EstimationMeetingProps> {
  public get taskEstimations() {
    return this._props.taskEstimations;
  }

  /**
   * Create an estimation meeting
   * @param props Properties to create an estimation meeting
   */
  public static create(props: CreateEstimationMeetingProps) {
    return new EstimationMeeting({
      ...props,
      taskEstimations: new TaskEstimationWatchedList(),
      members: new MemberWatchedList(),
      status: MeetingStatus.ACTIVE,
    });
  }

  /**
   * Add a task estimation, every member in team can create task
   * @param memberId
   * @param title
   * @param description
   */
  public addTaskEstimation(
    memberId: CUID,
    title: TaskTitle,
    description: Nullable<string>,
  ) {
    RuleValidator.validate(
      new OnlyMeetingMemberCanAddTaskRule(this._props.members, memberId),
      new OnlyModifyDataInActiveMeetingRule(this._props.status),
    );
    const taskEstimation = TaskEstimation.create({
      meetingId: this.id as CUID,
      title,
      description,
    });
    this._props.taskEstimations.add(taskEstimation);
    this.apply(
      new TaskEstimationAddedEvent({
        aggregateId: this.id,
        taskEstimationId: taskEstimation.id as CUID,
        title,
        description,
      }),
    );
    this.update();
    return taskEstimation;
  }

  /**
   * Update title and description of task
   * @param taskEstimationId
   * @param title
   * @param description
   */
  public updateTaskEstimation(
    taskEstimationId: CUID,
    title: TaskTitle,
    description: Nullable<string>,
  ) {
    RuleValidator.validate(
      new OnlyModifyDataInActiveMeetingRule(this._props.status),
    );
    const taskEstimation =
      this._props.taskEstimations.findOneById(taskEstimationId);
    if (!taskEstimation) {
      throw new TaskEstimationNotFoundException();
    }
    RuleValidator.validate(new TaskToUpdateMustBeActiveRule(taskEstimation));
    taskEstimation.updateTitle(title);
    taskEstimation.updateDescription(description);
    this._props.taskEstimations.update(taskEstimation);
    this.apply(
      new TaskEstimationUpdatedEvent({
        aggregateId: this.id,
        taskEstimationId: taskEstimation.id as CUID,
        title,
        description,
      }),
    );
    this.update();
    return taskEstimation;
  }

  /**
   * Remove a task, every member can do it
   * @param taskEstimationId
   */
  public removeTaskEstimation(taskEstimationId: CUID) {
    RuleValidator.validate(
      new OnlyModifyDataInActiveMeetingRule(this._props.status),
    );
    const taskEstimation =
      this._props.taskEstimations.findOneById(taskEstimationId);
    if (!taskEstimation) {
      throw new TaskEstimationNotFoundException();
    }
    taskEstimation.updateStatus(TaskEstimationStatus.REMOVED);
    this._props.taskEstimations.update(taskEstimation);
    this.apply(
      new TaskEstimationRemovedEvent({
        aggregateId: this.id,
        taskEstimationId: taskEstimation.id as CUID,
      }),
    );
    this.update();
  }

  /**
   * Add the estimation value of a member for a task, watcher members can't update value
   * @param meetingMemberId
   * @param taskEstimationId
   * @param estimationValue
   */
  public updateMemberEstimation(
    meetingMemberId: CUID,
    taskEstimationId: CUID,
    estimationValue: Nullable<number>,
  ) {
    const taskEstimation =
      this._props.taskEstimations.findOneById(taskEstimationId);
    if (!taskEstimation) {
      throw new TaskEstimationNotFoundException();
    }
    const member = this._props.members.findOneById(meetingMemberId);
    if (!member) {
      throw new MeetingMemberNotFoundException();
    }
    RuleValidator.validate(new OnlyVoterCanEstimateRule(member));
    taskEstimation.updateMemberEstimation(meetingMemberId, estimationValue);
    this.update();
  }

  validate() {
    return;
  }
}
