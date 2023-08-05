import { Member, MemberProps } from '@lib/group/domain';
import { BaseOrmMapper, CUID } from '@lib/shared';
import { Injectable } from '@nestjs/common';

import { MemberOrmEntity } from '../orm-entities';
import { RoleOrmMapper } from './role.orm-mapper';

@Injectable()
export class MemberOrmMapper extends BaseOrmMapper<
  Member,
  MemberProps,
  MemberOrmEntity
> {
  constructor(private readonly _roleMapper: RoleOrmMapper) {
    super(Member);
  }

  protected toEntityProps(ormEntity: MemberOrmEntity): MemberProps {
    return {
      name: ormEntity.name,
      groupId: new CUID(ormEntity.groupId),
      userId: new CUID(ormEntity.userId),
      roleId: new CUID(ormEntity.roleId),
      avatar: ormEntity.avatar,
    };
  }

  protected toOrmProps(entity: Member) {
    const props = entity.getProps();
    return {
      name: props.name,
      avatar: props.avatar,
      groupId: props.groupId.unpack(),
      userId: props.userId.unpack(),
      roleId: props.roleId.unpack(),
    };
  }
}
