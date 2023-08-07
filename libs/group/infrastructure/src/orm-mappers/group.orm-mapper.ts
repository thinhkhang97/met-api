import { Group, GroupProps } from '@lib/group/domain';
import { BaseOrmMapper } from '@lib/shared';
import { Injectable } from '@nestjs/common';

import { GroupOrmEntity } from '../orm-entities';
import { MemberOrmMapper } from './member.orm-mapper';
import { RoleOrmMapper } from './role.orm-mapper';

@Injectable()
export class GroupOrmMapper extends BaseOrmMapper<
  Group,
  GroupProps,
  GroupOrmEntity
> {
  constructor(
    private readonly _memberMapper: MemberOrmMapper,
    private readonly _roleMapper: RoleOrmMapper,
  ) {
    super(Group);
  }

  protected toEntityProps(ormEntity: GroupOrmEntity): GroupProps {
    console.log(ormEntity);
    return {
      name: ormEntity.name,
      roles: ormEntity.roles.map((role) => this._roleMapper.toEntity(role)),
      members: ormEntity.members.map((member) =>
        this._memberMapper.toEntity(member),
      ),
    };
  }

  protected toOrmProps(entity: Group) {
    const props = entity.getProps();
    return {
      name: props.name,
      roles: props.roles.map((role) => this._roleMapper.toOrm(role)),
      members: props.members.map((member) => this._memberMapper.toOrm(member)),
    };
  }
}
