import { Either, GraphQLUser, LoggedInUser } from '@lib/shared';
import { UpdateNameCommand } from '@lib/user/application/commands';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserMutationResultObject } from '../objects/user-mutation-result.object';

@Resolver()
export class UpdateName {
  constructor(private readonly _commandBus: CommandBus) {}

  @Mutation(() => UserMutationResultObject, { name: 'userUpdateName' })
  async updateName(
    @Args({ type: () => String, name: 'name' }) name: string,
    @GraphQLUser() loggedInUser: LoggedInUser,
  ) {
    const result = await this._commandBus.execute<
      UpdateNameCommand,
      Either<void>
    >(
      new UpdateNameCommand({
        userId: loggedInUser.id,
        name,
      }),
    );
    if (result.isErr()) {
      return new UserMutationResultObject({
        errorMessage: result.unwrapErr().message,
        status: 'failed',
      });
    }
    return new UserMutationResultObject({
      errorMessage: undefined,
      status: 'success',
    });
  }
}
