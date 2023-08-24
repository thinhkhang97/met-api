import { CreateEstimationMeetingCommand } from '@lib/meeting/application';
import { EstimationMeeting } from '@lib/meeting/domain';
import { EstimationMeetingObject } from '@lib/meeting/graphql-ui/objects';
import { Either } from '@lib/shared';
import { CommandBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class MeetingMutation {
  constructor(private readonly _commandBus: CommandBus) {}

  @Mutation(() => EstimationMeetingObject)
  async createEstimationMeeting(
    @Args({ type: () => ID, name: 'groupId' }) groupId: string,
    @Args({ type: () => String, name: 'title' }) title: string,
  ) {
    const result = await this._commandBus.execute<
      CreateEstimationMeetingCommand,
      Either<EstimationMeeting>
    >(new CreateEstimationMeetingCommand({ groupId, title }));
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return new EstimationMeetingObject(result.unwrap());
  }
}
