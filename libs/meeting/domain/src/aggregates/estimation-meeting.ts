import { CUID, Nullable, RuleValidator } from '@lib/shared';

import { MeetingStatus, TaskEstimationStatus } from '../constance';
import {
  MeetingMemberNotFoundException,
  TaskEstimationNotFoundException,
} from '../exceptions';
import { OnlyVoterCanEstimateRule } from '../rules';
import { CreateMeetingProps, Meeting, MeetingProps } from './meeting.aggregate';
import { TaskEstimation } from './task-estimation.aggregate';

type CreateEstimationMeetingProps = CreateMeetingProps;

export interface EstimationMeetingProps extends MeetingProps {
  /**
   * Tasks need to be considered and estimated by the members in the meeting
   */
  taskEstimations: TaskEstimation[];
}

/**
 * Estimation is a meeting that everyone in a group plans, estimate the complex of tasks in the sprint by
 * giving the points, hours for each of them
 */
export class EstimationMeeting extends Meeting<EstimationMeetingProps> {
  /**
   * Create an estimation meeting
   * @param props Properties to create an estimation meeting
   */
  public static create(props: CreateEstimationMeetingProps) {
    return new EstimationMeeting({
      ...props,
      taskEstimations: [],
      members: [],
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
    title: string,
    description: Nullable<string>,
  ) {
    const taskEstimation = TaskEstimation.create({
      meetingId: this.id as CUID,
      title,
      description,
      averageEstimation: null,
      memberEstimations: [],
    });
    this._props.taskEstimations.push(taskEstimation);
    this.update();
  }

  /**
   * Remove a task, every member can do it
   * @param taskEstimationId
   */
  public removeTaskEstimation(taskEstimationId: CUID) {
    const taskEstimation = this._props.taskEstimations.find((task) =>
      task.id.equals(taskEstimationId),
    );
    if (!taskEstimation) {
      throw new TaskEstimationNotFoundException();
    }
    taskEstimation.updateStatus(TaskEstimationStatus.REMOVED);
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
    const taskEstimation = this._props.taskEstimations.find((task) =>
      task.id.equals(taskEstimationId),
    );
    if (!taskEstimation) {
      throw new TaskEstimationNotFoundException();
    }
    const member = this._props.members.find((_member) =>
      _member.id.equals(meetingMemberId),
    );
    if (!member) {
      throw new MeetingMemberNotFoundException();
    }
    RuleValidator.validate(new OnlyVoterCanEstimateRule(member));
    taskEstimation.updateMemberEstimation(meetingMemberId, estimationValue);
    this.update();
  }

  /**
   * Get task estimation by id
   * @param taskEstimationId
   */
  public getTaskEstimation(taskEstimationId: CUID) {
    const taskEstimation = this._props.taskEstimations.find(
      (task) =>
        task.id.equals(taskEstimationId) &&
        task.status === TaskEstimationStatus.ACTIVE,
    );
    if (!taskEstimation) {
      throw new TaskEstimationNotFoundException();
    }
    return taskEstimation;
  }

  /**
   * Get all active task estimations
   */
  public getActiveTaskEstimations() {
    return this._props.taskEstimations.filter(
      (task) => task.status === TaskEstimationStatus.ACTIVE,
    );
  }

  validate() {
    return;
  }
}
