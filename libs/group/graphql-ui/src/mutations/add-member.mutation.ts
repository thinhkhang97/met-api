import { AddMemberCommand } from '@lib/group/application';
import { Member } from '@lib/group/domain';
import { MemberObject } from '@lib/group/graphql-ui/objects';
import { Either, GraphQLUser, LoggedInUser } from '@lib/shared';
import { CommandBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';

import { AddMemberResultUnion } from '../union';

@Resolver()
export class AddMemberMutation {
  constructor(private readonly _commandBus: CommandBus) {}

  @Mutation(() => AddMemberResultUnion)
  async addMember(
    @Args({ type: () => String, name: 'email' })
    email: string,
    @Args({ type: () => String, name: 'nameInGroup' }) name: string,
    @Args({ type: () => ID, name: 'groupId' }) groupId: string,
    @GraphQLUser() loggedUser: LoggedInUser,
  ) {
    const result = await this._commandBus.execute<
      AddMemberCommand,
      Either<Member>
    >(
      new AddMemberCommand({
        name,
        groupId,
        userId: loggedUser.id,
        email,
      }),
    );
    if (result.isErr()) {
      return {
        status: 'failed',
        errorMessage: result.unwrapErr().message,
      };
    }
    return new MemberObject(result.unwrap());
  }
}
