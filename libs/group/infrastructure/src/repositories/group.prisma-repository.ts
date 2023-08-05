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
    private readonly _prismaService: GroupPrismaService,
    private readonly _ormMapper: GroupOrmMapper,
  ) {
    super(_prismaService.group, _ormMapper);
  }

  getWhereCondition(props: QueryParams<GroupProps>): Prisma.GroupWhereInput {
    const whereInput: Prisma.GroupWhereInput = {};

    if (props.id) {
      whereInput.id = props.id.value;
    }

    return whereInput;
  }

  public preSave(entity: Group): {
    create: GroupOrmEntity;
    update: GroupOrmEntity & { version: number };
    where: { id: string };
  } {
    const ormProps = this._ormMapper.toOrm(entity);

    return {
      where: { id: ormProps.id },
      create: { ...ormProps },
      update: { ...ormProps, version: ormProps.version + 1 },
    };
  }
}
