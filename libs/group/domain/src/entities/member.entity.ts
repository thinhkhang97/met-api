import { BaseEntity, CUID, Nullable } from '@lib/shared';

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
}

export class Member extends BaseEntity<MemberProps> {
  public static create(props: CreateMemberProps) {
    return new Member({ ...props, role: null });
  }

  validate() {
    return;
  }
}
