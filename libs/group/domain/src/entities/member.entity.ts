import { BaseEntity, CUID, Nullable } from '@lib/shared';

import { MemberStatus } from '../constant';
import { Role } from './role.entity';

type CreateMemberProps = {
  userId: CUID;
  groupId: CUID;
  avatar: Nullable<string>;
  name: string;
  roleId: CUID;
};

export interface MemberProps extends CreateMemberProps {
  role: Nullable<Role>;
  status: MemberStatus;
}

/**
 * Member of a group, each member has a role
 */
export class Member extends BaseEntity<MemberProps> {
  /**
   * Create a new member for a group
   * @param props Properties to create a member
   */
  public static create(props: CreateMemberProps) {
    return new Member({ ...props, role: null, status: MemberStatus.ACTIVE });
  }

  public updateName(name: string) {
    this._props.name = name;
    this.update();
  }

  public removed() {
    this._props.status = MemberStatus.REMOVED;
    this.update();
  }

  public reactivate() {
    this._props.status = MemberStatus.ACTIVE;
    this.update();
  }

  validate() {
    return;
  }
}
