import { Member } from '@lib/group/domain';
import { BaseObject, Nullable } from '@lib/shared';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { RoleObject } from './role.object';

@ObjectType('Member')
export class MemberObject extends BaseObject {
  @Field(() => String)
  public readonly name: string;

  @Field(() => ID)
  public readonly groupId: string;

  @Field(() => ID)
  public readonly roleId: string;

  @Field(() => RoleObject, { nullable: true })
  public readonly role: Nullable<RoleObject>;

  constructor(member: Member) {
    const props = member.getProps();
    super(props);
    this.name = props.name;
    this.groupId = props.groupId.unpack();
    this.roleId = props.roleId.unpack();
    this.role = props.role ? new RoleObject(props.role) : null;
  }
}
