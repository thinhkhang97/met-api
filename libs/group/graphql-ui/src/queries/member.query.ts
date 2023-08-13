import { GetMemberQuery } from '@lib/group/application/queries';
import { Member } from '@lib/group/domain';
import {
  MemberBaseErrorObject,
  MemberObject,
} from '@lib/group/graphql-ui/objects';
import { Either } from '@lib/shared';
import { QueryBus } from '@nestjs/cqrs';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';

import { MemberResultUnion } from '../union';

@Resolver()
export class MemberQuery {
  constructor(private readonly _queryBus: QueryBus) {}

  @Query(() => MemberResultUnion, { name: 'member' })
  public async getMember(
    @Args({ type: () => ID, name: 'memberId' }) memberId: string,
  ) {
    const result = await this._queryBus.execute<GetMemberQuery, Either<Member>>(
      new GetMemberQuery({ memberId }),
    );
    if (result.isErr()) {
      return new MemberBaseErrorObject(result.unwrapErr().message);
    }
    return new MemberObject(result.unwrap());
  }
}
