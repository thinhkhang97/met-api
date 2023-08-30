import { BaseEntity, CUID } from '@lib/shared';

import { MemberRole, MemberStatus } from '../constance';

export interface CreateMemberProps {
  /**
   * Member's id in the group
   */
  memberId: CUID;

  /**
   * Type of member in the meeting
   */
  role: MemberRole;

  /**
   * Name of member in group
   */
  name: string;

  /**
   * Meeting id
   */
  meetingId: CUID;
}

export interface MemberProps extends CreateMemberProps {
  /**
   * Status
   */
  status: MemberStatus;
}

/**
 * A member in a meeting
 */
export class Member extends BaseEntity<MemberProps> {
  get meetingId() {
    return this._props.meetingId;
  }

  get name() {
    return this._props.name;
  }

  get memberId() {
    return this._props.memberId;
  }

  get role() {
    return this._props.role;
  }

  public static create(props: CreateMemberProps) {
    return new Member({ ...props, status: MemberStatus.OFFLINE });
  }

  validate() {
    return;
  }
}
