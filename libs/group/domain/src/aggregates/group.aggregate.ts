import { AggregateRoot, CUID } from '@lib/shared';

import { Member, Role } from '../entities';

type CreateGroupProps = {
  userId: CUID;
  ownerName: string;
  name: string;
};

type GroupProps = {
  name: string;
  roles: Role[];
  members: Member[];
};

export class Group extends AggregateRoot<GroupProps> {
  public static create(props: CreateGroupProps) {
    const groupId = CUID.generate();
    const roles = Role.forCasual(groupId);
    const owner = new Member({
      name: props.ownerName,
      userId: props.userId,
      groupId,
      role: Role.getOwner(roles),
    });
    return new Group({ name: props.name, roles, members: [owner] }, groupId);
  }

  public addMember(name: string, userId: CUID) {
    this._props.members.push(
      new Member({
        name,
        userId,
        groupId: this._props.id as CUID,
        role: Role.getMember(this._props.roles),
      }),
    );
    this.update();
  }

  valiate() {
    return;
  }
}
