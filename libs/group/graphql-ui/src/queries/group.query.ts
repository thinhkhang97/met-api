import { GetGroupQuery, GetGroupsQuery } from '@lib/group/application/queries';
import { Group } from '@lib/group/domain';
import { GroupObject } from '@lib/group/graphql-ui/objects';
import { GroupResult } from '@lib/group/graphql-ui/union';
import { Either, GraphQLUser, LoggedUser } from '@lib/shared';
import { QueryBus } from '@nestjs/cqrs';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GroupQuery {
  constructor(private readonly _queryBus: QueryBus) {}

  @Query(() => String)
  public groupHealthCheck() {
    return 'Group queries';
  }

  @Query(() => GroupResult, { name: 'group' })
  public async getGroup(
    @Args({ type: () => ID, name: 'groupId' }) groupId: string,
    @GraphQLUser() loggedUser: LoggedUser,
  ) {
    const result = await this._queryBus.execute<GetGroupQuery, Either<Group>>(
      new GetGroupQuery({ groupId, userId: loggedUser.id }),
    );
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return new GroupObject(result.unwrap());
  }

  @Query(() => [GroupObject], { name: 'groups' })
  public async getGroups(@GraphQLUser() loggedUser: LoggedUser) {
    const result = await this._queryBus.execute<
      GetGroupsQuery,
      Either<Group[]>
    >(new GetGroupsQuery({ userId: loggedUser.id }));

    if (result.isErr()) {
      return [];
    }

    return result.unwrap().map((group) => new GroupObject(group));
  }
}
