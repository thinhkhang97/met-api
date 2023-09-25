import { BaseEntity, CUID, Nullable } from '@lib/shared';

import { MemberStatus } from '../constant';
import { Role } from './role.entity';

type CreateMemberProps = {
  userId: CUID;
  groupId: CUID;
  avatar: Nullable<string>;
  name: string;
  role: Role;
};

export interface MemberProps {
  userId: CUID;
  groupId: CUID;
  avatar: Nullable<string>;
  name: string;
  roleId: CUID;
  status: MemberStatus;
  role: Nullable<Role>;
}

/**
 * Member of a group, each member has a role
 */
export class Member extends BaseEntity<MemberProps> {
  public get role() {
    return this._props.role;
  }

  /**
   * Create a new member for a group
   * @param props Properties to create a member
   */
  public static create(props: CreateMemberProps) {
    return new Member({
      ...props,
      roleId: props.role.id as CUID,
      status: MemberStatus.ACTIVE,
    });
  }

  public isActive() {
    return this._props.status === MemberStatus.ACTIVE;
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

  public leave() {
    this._props.status = MemberStatus.LEAVED;
    this.update();
  }

  validate() {
    return;
  }
}
