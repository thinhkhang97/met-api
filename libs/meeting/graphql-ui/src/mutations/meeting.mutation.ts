import { CreateEstimationMeetingCommand } from '@lib/meeting/application';
import { EstimationMeeting } from '@lib/meeting/domain';
import { EstimationMeetingObject } from '@lib/meeting/graphql-ui/objects';
import { Either, GraphQLUser, LoggedUser } from '@lib/shared';
import { CommandBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';

import { CreateEstimationMeetingResultUnion } from '../unions';

@Resolver()
export class MeetingMutation {
  constructor(private readonly _commandBus: CommandBus) {}

  @Mutation(() => CreateEstimationMeetingResultUnion)
  async createEstimationMeeting(
    @Args({ type: () => ID, name: 'groupId' }) groupId: string,
    @Args({ type: () => String, name: 'title' }) title: string,
    @GraphQLUser() loggedUser: LoggedUser,
  ) {
    const result = await this._commandBus.execute<
      CreateEstimationMeetingCommand,
      Either<EstimationMeeting>
    >(
      new CreateEstimationMeetingCommand({
        groupId,
        title,
        userId: loggedUser.id,
      }),
    );
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return new EstimationMeetingObject(result.unwrap());
  }
}
