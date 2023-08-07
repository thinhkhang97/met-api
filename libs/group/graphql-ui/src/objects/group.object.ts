import { Group } from '@lib/group/domain';
import { BaseObject } from '@lib/shared';
import { Field, ObjectType } from '@nestjs/graphql';

import { RoleObject } from './role.object';

@ObjectType('Group')
export class GroupObject extends BaseObject {
  @Field(() => String)
  public readonly name: string;

  @Field(() => [RoleObject])
  public readonly roles: RoleObject[];

  constructor(group: Group) {
    const props = group.getProps();
    super(props);
    this.name = props.name;
    this.roles = props.roles.map((role) => new RoleObject(role));
  }
}
