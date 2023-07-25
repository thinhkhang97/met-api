import { Role, RoleProps } from '@lib/group/domain';
import { BaseOrmMapper, CUID } from '@lib/shared';
import { Injectable } from '@nestjs/common';

import { RoleOrmEntity } from '../orm-entities';

@Injectable()
export class RoleOrmMapper extends BaseOrmMapper<
  Role,
  RoleProps,
  RoleOrmEntity
> {
  constructor() {
    super(Role);
  }

  protected toEntityProps(ormEntity: RoleOrmEntity): RoleProps {
    return {
      groupId: new CUID(ormEntity.groupId),
      name: ormEntity.name,
    };
  }

  protected toOrmProps(entity: Role) {
    const props = entity.getProps();
    return {
      groupId: props.groupId.unpack(),
      name: props.name,
    };
  }
}
