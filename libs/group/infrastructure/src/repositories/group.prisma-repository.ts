import { Group, GroupProps } from '@lib/group/domain';
import { GroupPrismaService, PrismaRepository, QueryParams } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/group-client';
import { omit } from 'lodash';

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

  getIncludeRelation(): { include: { [key in keyof GroupProps]?: boolean } } {
    return {
      include: {
        roles: true,
      },
    };
  }

  protected override getWhereCondition(
    props: QueryParams<GroupProps>,
  ): Prisma.GroupWhereInput {
    const whereInput: Prisma.GroupWhereInput = {};

    if (props.id) {
      whereInput.id = props.id.value;
    }

    if (props.name) {
      whereInput.name = props.name;
    }

    return whereInput;
  }

  protected override preSave(entity: Group): Prisma.GroupUpsertArgs {
    const ormProps = this._groupOrmMapper.toOrm(entity);
    const roles = ormProps.roles.map((role) => omit(role, 'groupId'));
    const members = (ormProps.members || []).map((member) =>
      omit(member, ['groupId', 'role']),
    );
    return {
      include: { roles: true, members: true },
      where: { id: ormProps.id },
      create: {
        ...ormProps,
        roles: {
          createMany: {
            data: roles,
          },
        },
        members: {
          createMany: {
            data: members,
          },
        },
      },
      update: {
        ...ormProps,
        roles: this.preUpsertRoles(roles),
        members: this.preUpsertMembers(members),
      },
    };
  }

  private preUpsertRoles(
    roles: Omit<RoleOrmEntity, 'groupId'>[],
  ): Prisma.RoleUpdateManyWithoutGroupNestedInput {
    return {
      upsert: roles.map((role) => {
        return {
          where: { id: role.id },
          create: { ...role },
          update: { ...role },
        };
      }),
    };
  }

  private preUpsertMembers(
    members: Omit<MemberOrmEntity, 'groupId' | 'role'>[],
  ): Prisma.MemberUpdateManyWithoutGroupNestedInput {
    return {
      upsert: members.map((member) => {
        const memberWithoutRole = omit(member, 'role');
        return {
          where: { id: member.id },
          create: { ...memberWithoutRole },
          update: { ...memberWithoutRole },
        };
      }),
    };
  }
}
