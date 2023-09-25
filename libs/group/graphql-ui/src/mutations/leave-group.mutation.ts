import { LeaveGroupCommand } from '@lib/group/application';
import { GroupBaseResultObject } from '@lib/group/graphql-ui/objects';
import { Either, GraphQLUser, LoggedInUser } from '@lib/shared';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class LeaveGroupMutation {
  constructor(private readonly _commandBus: CommandBus) {}
  @Mutation(() => GroupBaseResultObject, { name: 'leaveGroup' })
  async leaveGroup(
    @Args({ type: () => String, name: 'groupId' }) groupId: string,
    @GraphQLUser() loggedInUser: LoggedInUser,
  ) {
    const result = await this._commandBus.execute<
      LeaveGroupCommand,
      Either<void>
    >(new LeaveGroupCommand({ groupId, userId: loggedInUser.id }));
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
