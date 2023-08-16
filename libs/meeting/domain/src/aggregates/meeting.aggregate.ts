import { AggregateRoot, CUID } from '@lib/shared/ddd';

import { MeetingPurpose } from '../constance';
import { PlaningMember } from '../entities';

export interface CreateMeetingProps {
  /**
   * Group id
   */
  groupId: CUID;
  /**
   * The purpose of the meeting, it can be a deep dive meeting or a meal
   */
  purpose: MeetingPurpose;
  /**
   * Member who create the meeting
   */
  members: PlaningMember[];
}

export type MeetProps = CreateMeetingProps;

/**
 * Everyone in a group has ability to hold a meeting with other member in the group
 */
export abstract class Meeting<C extends MeetProps> extends AggregateRoot<C> {
  /**
   * Remove a member out of the meeting
   * @param member
   */
  public removeMember(member: PlaningMember) {
    this._props.members = this._props.members.filter(
      (_member) => !member.equals(_member),
    );
    this.update();
  }

  /**
   * Add a member into the meeting
   * @param member
   */
  public addMember(member: PlaningMember) {
    this._props.members.push(member);
    this.update();
  }
}
