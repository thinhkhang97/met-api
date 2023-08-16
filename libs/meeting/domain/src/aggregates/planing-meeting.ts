import { CUID, Nullable } from '@lib/shared';

import { PlaningMemberVote, PlaningTask } from '../entities';
import { VoteNotFoundException } from '../exceptions';
import { CreateMeetingProps, Meeting } from './meeting.aggregate';
import { PlaningVote } from './planing-vote.aggregate';

interface CreatePlaningMeetingProps extends CreateMeetingProps {
  /**
   * Title of the meeting
   */
  title: string;
  /**
   * More detail for the meeting
   */
  description: Nullable<string>;
}

interface PlaningMeetingProps extends CreatePlaningMeetingProps {
  /**
   * Tasks need to be considered and estimated by the members in the meeting
   */
  planingTasks: PlaningTask[];

  /**
   * List of votes for the tasks in the meeting
   */
  votes: PlaningVote[];
}

/**
 * Planing is a meeting that everyone in a group plans, estimate the complex of tasks in the sprint by
 * giving the points, hours for each of them
 */
export class PlaningMeeting extends Meeting<PlaningMeetingProps> {
  /**
   * Create a deep dive meeting
   * @param props Properties to create a deep dive meeting
   */
  public static create(props: CreatePlaningMeetingProps) {
    return new PlaningMeeting({ ...props, planingTasks: [], votes: [] });
  }

  /**
   * Add a task for planing,
   * every member in team can create task
   * @param task
   */
  public addTask(task: PlaningTask) {
    this._props.planingTasks.push(task);
    this.update();
  }

  /**
   * Remove a task, every member can do it
   * @param task
   */
  public removeTask(task: PlaningTask) {
    this._props.planingTasks = this._props.planingTasks.filter(
      (_task) => !_task.equals(task),
    );
    this.update();
  }

  /**
   * Initialize a vote session, put all members in the meeting to the vote to get value for a task
   * @param task
   */
  public startVote(task: PlaningTask) {
    const planingVote = this._props.votes.find((v) =>
      v.planingTask.equals(task),
    );
    if (planingVote) {
      return;
    }
    const memberVotes = this._props.members.map(
      (member) => new PlaningMemberVote({ ...member.getProps(), vote: null }),
    );
    this._props.votes.push(
      new PlaningVote({ planingTask: task, memberVotes, vote: 0 }),
    );
  }

  /**
   * Update the vote value of a member for the task, only voter can update value
   * @param voteId
   * @param memberVoteId
   * @param voteValue
   */
  public updateMemberVote(voteId: CUID, memberVoteId: CUID, voteValue: number) {
    const vote = this._props.votes.find((v) => v.id.equals(voteId));
    if (!vote) {
      throw new VoteNotFoundException();
    }
    vote.updateMemberVote(memberVoteId, voteValue);
    this.update();
  }

  validate() {
    return;
  }
}
