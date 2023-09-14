import { GetGroupsQuery } from '@lib/group/application/queries';
import { Group } from '@lib/group/domain';
import { GroupObject } from '@lib/group/graphql-ui/objects';
import { Either, GraphQLUser, LoggedInUser } from '@lib/shared';
import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => [GroupObject])
export class GroupsQuery {
  constructor(private readonly _queryBus: QueryBus) {}

  @Query(() => [GroupObject], { name: 'groups' })
  public async getGroups(@GraphQLUser() loggedUser: LoggedInUser) {
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
