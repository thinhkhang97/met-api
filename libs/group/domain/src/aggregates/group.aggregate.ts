import { AggregateRoot, CUID, RuleValidator } from '@lib/shared';

import { Member, Role } from '../entities';
import { OnlyOwnerCanAddMemberRule } from '../rules';

/**
 * Properties to create a group
 */
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

/**
 * Group is aggregate root that take the responsibilities to manage members and roles
 */
export class Group extends AggregateRoot<GroupProps> {
  get roles() {
    return this._props.roles;
  }

  /**
   * Create a new group, the user performs this action also becomes the owner of the group
   * Roles also be initiated in the process.
   * @param props Properties to create a group
   */
  public static create(props: CreateGroupProps) {
    const groupId = CUID.generate();
    const roles = Role.forCasual(groupId);
    const owner = Member.create({
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

  /**
   * Add a new member into group, only the group owner can perform this action
   * @param addedByMember Group owner
   * @param newMemberName Name of new member in group
   * @param newMemberUserId user's id of new member to register
   */
  public addNewMember(
    addedByMember: Member,
    newMemberName: string,
    newMemberUserId: CUID,
  ) {
    RuleValidator.validate(new OnlyOwnerCanAddMemberRule(this, addedByMember));
    this._props.members.push(
      Member.create({
        name: newMemberName,
        userId: newMemberUserId,
        avatar: null,
        groupId: this._props.id as CUID,
        roleId: Role.getMember(this._props.roles).id as CUID,
      }),
    );
    this.update();
  }

  validate() {
    return;
  }
}
