import { MeetingStatus, MemberRole } from '@lib/meeting/domain/constance';
import { AggregateRoot, CUID, DateVO } from '@lib/shared/ddd';

import { Member } from '../entities';

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
   * Start the meeting
   */
  from: DateVO;

  /**
   * End the meeting
   */
  to: DateVO;
}

export interface MeetProps extends CreateMeetingProps {
  /**
   * Member who create the meeting
   */
  members: Member[];

  /**
   * Meeting status, active or ended
   */
  status: MeetingStatus;
}

/**
 * Everyone in a group has ability to hold a meeting with other member in the group
 */
export abstract class Meeting<C extends MeetProps> extends AggregateRoot<C> {
  /**
   * Remove a member out of the meeting
   * @param member
   */
  public removeMember(member: Member) {
    this._props.members = this._props.members.filter(
      (_member) => !member.equals(_member),
    );
    this.update();
  }

  /**
   * Add a member into the meeting
   * @param memberId
   * @param name
   */
  public addMember(memberId: CUID, name: string) {
    let member = this._props.members.find((_member) =>
      _member.memberId.equals(memberId),
    );
    if (!member) {
      member = Member.create({
        name,
        memberId,
        role: MemberRole.VOTER,
        meetingId: this.id as CUID,
      });
    }
    this._props.members.push(member);

    this.update();
  }
}
