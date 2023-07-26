import { Group, GroupProps } from '@lib/group/domain';
import { GroupPrismaService, PrismaRepository, QueryParams } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/group-client';

import { GroupOrmEntity } from '../orm-entities';
import { GroupOrmMapper } from '../orm-mappers';

@Injectable()
export class GroupPrismaRepository extends PrismaRepository<
  Group,
  GroupProps,
  GroupOrmEntity,
  Prisma.GroupDelegate<undefined>
> {
  constructor(
    private readonly _groupPrismaService: GroupPrismaService,
    private readonly _groupOrmMapper: GroupOrmMapper,
  ) {
    super(_groupPrismaService.group, _groupOrmMapper);
  }

  getWhereCondition(props: QueryParams<GroupProps>): Prisma.GroupWhereInput {
    const whereInput: Prisma.GroupWhereInput = {};

    if (props.id) {
      whereInput.id = props.id.value;
    }

    return whereInput;
  }
}
