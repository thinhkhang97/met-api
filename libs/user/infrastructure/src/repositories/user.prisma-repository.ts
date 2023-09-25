import { PrismaRepository, QueryParams } from '@lib/shared';
import { User, UserProps } from '@lib/user/domain';
import { UserOrmMapper } from '@lib/user/infrastructure/orm-mappers';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/user-client';

import { UserOrmEntity } from '../orm-entities';
import { UserPrismaService } from '@lib/shared/services/prisma/user-prisma.service';

@Injectable()
export class UserPrismaRepository extends PrismaRepository<
  User,
  UserProps,
  UserOrmEntity,
  Prisma.UserDelegate<undefined>
> {
  constructor(
    private readonly _prismaService: UserPrismaService,
    _ormMapper: UserOrmMapper,
  ) {
    super(_prismaService.user, _ormMapper);
  }

  getWhereCondition(props: QueryParams<UserProps>): Prisma.UserWhereInput {
    const whereCondition: Prisma.UserWhereInput = {};
    if (props.id) {
      whereCondition.id = props.id.value;
    }

    if (props.email) {
      whereCondition.email = props.email.value;
    }

    return whereCondition;
  }

  getIncludeRelation():
    | { include: { [key in keyof UserProps]?: boolean } }
    | undefined {
    return undefined;
  }
}
