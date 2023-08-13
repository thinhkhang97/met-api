import { AddMemberCommand } from '@lib/group/application';
import { GroupBaseResultObject } from '@lib/group/graphql-ui/objects';
import { Either, GraphQLUser, LoggedUser } from '@lib/shared';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AddMemberMutation {
  constructor(private readonly _commandBus: CommandBus) {}

  @Mutation(() => GroupBaseResultObject)
  async addMember(
    @Args({ type: () => String, name: 'nameInGroup' }) name: string,
    @Args({ type: () => String, name: 'groupId' }) groupId: string,
    @Args({ type: () => String, name: 'memberId' }) memberId: string,
    @GraphQLUser() loggedUser: LoggedUser,
  ) {
    const result = await this._commandBus.execute<
      AddMemberCommand,
      Either<void>
    >(new AddMemberCommand({ name, groupId, userId: loggedUser.id, memberId }));
    if (result.isErr()) {
      return {
        status: 'failed',
        errorMessage: result.unwrapErr().message,
      };
    }
    return {
      status: 'success',
    };
  }
}
