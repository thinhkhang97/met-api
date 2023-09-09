import { Nullable } from '@lib/shared';
import { AggregateRoot, CUID, DateVO } from '@lib/shared/ddd';

import { MeetingStatus, MemberRole, MemberStatus } from '../constance';
import { Member } from '../entities';
import { MemberJoinedEvent, MemberLeftEvent } from '../events';
import { MemberWatchedList } from '../watched-list';

export interface CreateMeetingProps {
  /**
   * Group id
   */
  groupId: CUID;

  /**
   * Meeting title
   */
  title: string;

  /**
   * Meeting description
   */
  description: Nullable<string>;

  /**
   * Start the meeting
   */
  from: DateVO;

  /**
   * End the meeting
   */
  to: DateVO;
}

export interface MeetingProps extends CreateMeetingProps {
  /**
   * Member who create the meeting
   */
  members: MemberWatchedList;

  /**
   * Meeting status, active or ended
   */
  status: MeetingStatus;
}

/**
 * Everyone in a group has ability to hold a meeting with other member in the group
 */
export abstract class Meeting<C extends MeetingProps> extends AggregateRoot<C> {
  public get groupId() {
    return this._props.groupId;
  }

  public get members() {
    return this._props.members;
  }

  /**
   * Remove a member out of the meeting
   * @param memberId
   */
  public removeMember(memberId: CUID) {
    const member = this._props.members.findOneByMemberId(memberId);
    if (!member) {
      return;
    }
    member.updateStatus(MemberStatus.LEFT);
    this._props.members.update(member);
    this.apply(new MemberLeftEvent({ aggregateId: this.id, member }));
    this.update();
  }

  /**
   * Add a member into the meeting
   * @param memberId
   * @param name
   */
  public addMember(memberId: CUID, name: string) {
    let member = this._props.members.findOneByMemberId(memberId);
    if (!member) {
      member = Member.create({
        name,
        memberId,
        role: MemberRole.VOTER,
        meetingId: this.id as CUID,
      });
    } else {
      member.updateStatus(MemberStatus.ACTIVE);
    }
    this._props.members.add(member);
    this.apply(new MemberJoinedEvent({ aggregateId: this.id, member }));
    this.update();
    return member;
  }
}
