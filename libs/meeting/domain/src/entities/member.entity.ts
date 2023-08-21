import { BaseEntity, CUID } from '@lib/shared';

import { MemberRole } from '../constance';

export interface CreateMemberProps {
  /**
   * Member's id in the group
   */
  memberId: CUID;
  /**
   * Type of member in the meeting
   */
  type: MemberRole;
  /**
   * Name of member in group
   */
  name: string;
}

export type MemberProps = CreateMemberProps;

/**
 * A member in a meeting
 */
export class Member<
  PM extends MemberProps = MemberProps,
> extends BaseEntity<PM> {
  get type() {
    return this._props.type;
  }

  public static create(props: MemberProps) {
    return new Member(props);
  }

  validate() {
    return;
  }
}
