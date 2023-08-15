import { Role } from '@lib/group/domain';
import { BaseObject } from '@lib/shared';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('role')
export class RoleObject extends BaseObject {
  @Field(() => String)
  public readonly name: string;

  @Field(() => ID)
  public readonly groupId: string;

  constructor(role: Role) {
    const props = role.getProps();
    super(props);
    this.name = props.name;
    this.groupId = props.groupId.unpack();
  }
}
