import { Role, RoleProps } from '@lib/group/domain';
import { PrismaRepository, QueryParams } from '@lib/shared';
import { GroupPrismaService } from '@lib/shared/services/prisma/group-prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/group-client';

import { RoleOrmEntity } from '../orm-entities';
import { RoleOrmMapper } from '../orm-mappers';

@Injectable()
export class RolePrismaRepository extends PrismaRepository<
  Role,
  RoleProps,
  RoleOrmEntity,
  Prisma.RoleDelegate<undefined>
> {
  constructor(
    private readonly _groupPrismaService: GroupPrismaService,
    private readonly _roleOrmMapper: RoleOrmMapper,
  ) {
    super(_groupPrismaService.role, _roleOrmMapper);
  }

  getWhereCondition(props: QueryParams<RoleProps>): Prisma.RoleWhereInput {
    const whereInput: Prisma.RoleWhereInput = {};

    if (props.id) {
      whereInput.id = props.id.value;
    }

    return whereInput;
  }

  getIncludeRelation():
    | { include: { [key in keyof RoleProps]?: boolean } }
    | undefined {
    return undefined;
  }
}
