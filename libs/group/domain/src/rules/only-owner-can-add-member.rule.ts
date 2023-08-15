import { Group, Member, Role } from '@lib/group/domain';
import { BaseRule } from '@lib/shared';

export class OnlyOwnerCanAddMemberRule extends BaseRule {
  constructor(
    private readonly _group: Group,
    private readonly _member: Member,
  ) {
    super();
  }

  getErrorMessage(): string {
    return 'only_owner_can_add_member';
  }

  isFailed(): boolean {
    return !Role.getOwner(this._group.roles).id.equals(
      this._member.getProps().roleId,
    );
  }
}
