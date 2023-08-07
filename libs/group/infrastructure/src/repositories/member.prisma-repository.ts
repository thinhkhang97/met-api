import { Member, MemberProps } from '@lib/group/domain';
import { GroupPrismaService, PrismaRepository, QueryParams } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/group-client';

import { MemberOrmEntity } from '../orm-entities';
import { MemberOrmMapper } from '../orm-mappers';

@Injectable()
export class MemberPrismaRepository extends PrismaRepository<
  Member,
  MemberProps,
  MemberOrmEntity,
  Prisma.MemberDelegate<undefined>
> {
  constructor(
    private readonly _groupPrismaService: GroupPrismaService,
    private readonly _memberOrmMapper: MemberOrmMapper,
  ) {
    super(_groupPrismaService.member, _memberOrmMapper);
  }

  getWhereCondition(props: QueryParams<MemberProps>): Prisma.MemberWhereInput {
    const whereInput: Prisma.MemberWhereInput = {};

    if (props.id) {
      whereInput.id = props.id.value;
    }

    return whereInput;
  }

  getIncludeRelation():
    | { include: { [key in keyof MemberProps]?: boolean } }
    | undefined {
    return undefined;
  }
}
