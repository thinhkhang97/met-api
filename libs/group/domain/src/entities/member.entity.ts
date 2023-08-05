import { BaseEntity, CUID, Nullable } from '@lib/shared';

type CreateMemberProps = {
  userId: CUID;
  groupId: CUID;
  roleId: CUID;
  avatar: Nullable<string>;
  name: string;
};

export type MemberProps = CreateMemberProps;

export class Member extends BaseEntity<MemberProps> {
  validate() {
    return;
  }
}
