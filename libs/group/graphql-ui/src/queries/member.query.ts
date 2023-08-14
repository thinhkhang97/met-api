import {
  GetMemberQuery,
  GetMembersQuery,
} from '@lib/group/application/queries';
import { Member } from '@lib/group/domain';
import {
  MemberBaseErrorObject,
  MemberObject,
} from '@lib/group/graphql-ui/objects';
import { Either, GraphQLUser, LoggedUser } from '@lib/shared';
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

  @Query(() => [MemberObject], { name: 'members' })
  public async getMembers(
    @Args({ type: () => ID, name: 'groupId' }) groupId: string,
    @GraphQLUser() loggedUser: LoggedUser,
  ) {
    const result = await this._queryBus.execute<
      GetMembersQuery,
      Either<Member[]>
    >(
      new GetMembersQuery({
        groupId,
        userId: loggedUser.id,
      }),
    );

    if (result.isErr()) {
      return [];
    }
    return result.unwrap().map((member) => new MemberObject(member));
  }
}
