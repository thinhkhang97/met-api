import { BaseEntity, CUID, Nullable } from '@lib/shared';

import { Role } from './role.entity';

type CreateMemberProps = {
  userId: CUID;
  groupId: CUID;
  avatar: Nullable<string>;
  name: string;
  roles: Role[];
};

export type MemberProps = CreateMemberProps;

export class Member extends BaseEntity<MemberProps> {
  valiate() {
    return;
  }
}
