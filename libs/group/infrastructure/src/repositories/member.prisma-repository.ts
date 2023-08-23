import { Member, MemberProps } from '@lib/group/domain';
import { GroupPrismaService, PrismaRepository, QueryParams } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/group-client';
import { omit } from 'lodash';

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

    if (props.userId) {
      whereInput.userId = props.userId.value;
    }

    if (props.groupId) {
      whereInput.groupId = props.groupId.value;
    }

    if (props.status) {
      whereInput.status = props.status;
    }

    return whereInput;
  }

  getIncludeRelation():
    | { include: { [key in keyof MemberProps]?: boolean } }
    | undefined {
    return {
      include: {
        role: true,
      },
    };
  }

  protected preUpsert(entity: Member): Prisma.MemberUpsertArgs {
    const memberOrm = this._memberOrmMapper.toOrm(entity);
    const memberWithoutOrm = omit(memberOrm, 'role');
    return {
      include: {
        role: true,
      },
      where: {
        id: memberOrm.id,
      },
      create: {
        ...memberWithoutOrm,
      },
      update: {
        ...memberWithoutOrm,
      },
    };
  }
}
