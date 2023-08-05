import { Group, GroupProps } from '@lib/group/domain';
import { GroupPrismaService, PrismaRepository, QueryParams } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/group-client';
import _ from 'lodash';

import {
  GroupOrmEntity,
  MemberOrmEntity,
  RoleOrmEntity,
} from '../orm-entities';
import { GroupOrmMapper } from '../orm-mappers';

@Injectable()
export class GroupPrismaRepository extends PrismaRepository<
  Group,
  GroupProps,
  GroupOrmEntity,
  Prisma.GroupDelegate<undefined>
> {
  constructor(
    private readonly _prismaService: GroupPrismaService,
    private readonly _groupOrmMapper: GroupOrmMapper,
  ) {
    super(_prismaService.group, _groupOrmMapper);
  }

  protected override getWhereCondition(
    props: QueryParams<GroupProps>,
  ): Prisma.GroupWhereInput {
    const whereInput: Prisma.GroupWhereInput = {};

    if (props.id) {
      whereInput.id = props.id.value;
    }

    return whereInput;
  }

  protected override preSave(entity: Group): Prisma.GroupUpsertArgs {
    const ormProps = this._groupOrmMapper.toOrm(entity);

    return {
      where: { id: ormProps.id },
      create: {
        ...ormProps,
        roles: { createMany: { data: ormProps.roles } },
        members: { createMany: { data: ormProps.members } },
      },
      update: {
        ...ormProps,
        roles: this.preUpsertRoles(ormProps.roles),
        members: this.preUpsertMembers(ormProps.members),
      },
    };
  }

  private preUpsertRoles(
    roles: RoleOrmEntity[],
  ): Prisma.RoleUpdateManyWithoutGroupNestedInput {
    return {
      upsert: roles.map((role) => {
        const roleWithoutGroupId = _.omit(role, 'groupId');
        return {
          where: { id: role.id },
          create: { ...roleWithoutGroupId },
          update: { ...roleWithoutGroupId },
        };
      }),
    };
  }

  private preUpsertMembers(
    members: MemberOrmEntity[],
  ): Prisma.MemberUpdateManyWithoutGroupNestedInput {
    return {
      upsert: members.map((member) => {
        const memberWithoutGroupId = _.omit(member, 'groupId');
        return {
          where: { id: member.id },
          create: { ...memberWithoutGroupId },
          update: { ...memberWithoutGroupId },
        };
      }),
    };
  }
}
