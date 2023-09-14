import { RemoveMemberCommand } from '@lib/group/application';
import { Either, GraphQLUser, LoggedInUser } from '@lib/shared';
import { CommandBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';

import { GroupBaseResultObject } from '../objects';

@Resolver()
export class RemoveMemberMutation {
  constructor(private readonly _commandBus: CommandBus) {}

  @Mutation(() => GroupBaseResultObject, { name: 'removeMember' })
  public async removeMember(
    @Args({ type: () => ID, name: 'groupId' }) groupId: string,
    @Args({ type: () => ID, name: 'memberId' }) memberId: string,
    @GraphQLUser() user: LoggedInUser,
  ) {
    const result = await this._commandBus.execute<
      RemoveMemberCommand,
      Either<void>
    >(new RemoveMemberCommand({ groupId, memberId, userId: user.id }));
    if (result.isErr()) {
      return {
        status: 'failed',
        errorMessage: result.unwrapErr().message,
      };
    }
    return { status: 'success' };
  }
}
