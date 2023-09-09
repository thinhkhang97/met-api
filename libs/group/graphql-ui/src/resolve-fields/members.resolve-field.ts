import { GetMembersQuery } from '@lib/group/application/queries';
import { Member } from '@lib/group/domain';
import { GroupObject, MemberObject } from '@lib/group/graphql-ui/objects';
import { Either, GraphQLUser, LoggedInUser } from '@lib/shared';
import { QueryBus } from '@nestjs/cqrs';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => GroupObject)
export class MembersResolveField {
  constructor(private readonly _queryBus: QueryBus) {}

  @ResolveField('members', () => [MemberObject])
  async members(
    @Parent() group: GroupObject,
    @GraphQLUser() loggedUser: LoggedInUser,
  ) {
    const result = await this._queryBus.execute<
      GetMembersQuery,
      Either<Member[]>
    >(
      new GetMembersQuery({
        groupId: group.id,
        userId: loggedUser.id,
      }),
    );

    if (result.isErr()) {
      return [];
    }
    return result.unwrap().map((member) => new MemberObject(member));
  }
}
