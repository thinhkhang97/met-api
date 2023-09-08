import { CreateGroupCommand } from '@lib/group/application';
import { Group } from '@lib/group/domain';
import { CreateGroupResult } from '@lib/group/graphql-ui/union';
import { Either, GraphQLUser, LoggedInUser } from '@lib/shared';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GroupObject } from '../objects';

@Resolver('GroupCreate')
export class CreateGroupMutation {
  constructor(private readonly _commandBus: CommandBus) {}

  @Mutation(() => CreateGroupResult)
  public async createGroup(
    @Args({ type: () => String, name: 'groupName' }) groupName: string,
    @Args({ type: () => String, name: 'nameInGroup' }) nameInGroup: string,
    @GraphQLUser() user: LoggedInUser,
  ) {
    const result = await this._commandBus.execute<
      CreateGroupCommand,
      Either<Group>
    >(
      new CreateGroupCommand({
        groupName: groupName,
        ownerName: nameInGroup,
        userId: user.id,
      }),
    );
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return new GroupObject(result.unwrap());
  }
}
