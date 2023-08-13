import { AggregateRoot, CUID, RuleValidator } from '@lib/shared';

import { Member, Role } from '../entities';
import { OnlyOwnerCanAddMemberRule } from '../rules';

type CreateGroupProps = {
  userId: CUID;
  ownerName: string;
  name: string;
};

export type GroupProps = {
  name: string;
  roles: Role[];
  members: Member[];
};

export class Group extends AggregateRoot<GroupProps> {
  get roles() {
    return this._props.roles;
  }

  public static create(props: CreateGroupProps) {
    const groupId = CUID.generate();
    const roles = Role.forCasual(groupId);
    const owner = new Member({
      name: props.ownerName,
      userId: props.userId,
      roleId: Role.getOwner(roles).id as CUID,
      avatar: null,
      groupId,
    });
    return new Group(
      { name: props.name.toLowerCase(), roles, members: [owner] },
      groupId,
    );
  }

  public addNewMember(
    addedByMember: Member,
    newMemberName: string,
    newMemberId: CUID,
  ) {
    RuleValidator.validate(new OnlyOwnerCanAddMemberRule(this, addedByMember));
    this._props.members.push(
      new Member({
        name: newMemberName,
        userId: newMemberId,
        avatar: null,
        groupId: this._props.id as CUID,
        roleId: Role.getMember(this._props.roles).id as CUID,
      }),
    );
    this.update();
  }

  // TODO: Implement later, should using watched list
  public removeMember(memberId: CUID) {
    return;
  }

  validate() {
    return;
  }
}
