import { BaseEntity, CUID } from '@lib/shared';

import { Role } from './role.entity';

type CreateMemberProps = {
  userId: CUID;
  groupId: CUID;
  name: string;
  role: Role;
};

type MemberProps = CreateMemberProps;

export class Member extends BaseEntity<MemberProps> {
  valiate() {
    return;
  }
}
