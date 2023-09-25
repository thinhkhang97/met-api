import { Group, Member, Role } from '@lib/group/domain';
import { BaseRule } from '@lib/shared';

export class GroupOwnerCannotLeaveGroupRule extends BaseRule {
  constructor(private readonly group: Group, private readonly member: Member) {
    super();
  }

  getErrorMessage(): string {
    return 'group_owner_cannot_leave_group';
  }

  isFailed(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Role.getOwner(this.group.roles).equals(this.member.role!);
  }
}
