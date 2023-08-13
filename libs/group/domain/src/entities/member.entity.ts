import { BaseEntity, CUID, Nullable } from '@lib/shared';

import { Role } from './role.entity';

type CreateMemberProps = {
  userId: CUID;
  groupId: CUID;
  avatar: Nullable<string>;
  name: string;
  role: Role;
};

export interface MemberProps extends CreateMemberProps {
  roleId: CUID;
}

export class Member extends BaseEntity<MemberProps> {
  public static create(props: CreateMemberProps) {
    return new Member({ ...props, roleId: props.role.id as CUID });
  }

  validate() {
    return;
  }
}
