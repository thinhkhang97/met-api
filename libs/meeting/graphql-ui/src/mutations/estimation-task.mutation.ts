import { UpdateMemberEstimationCommand } from '@lib/meeting/application';
import { UpdateMemberEstimationArg } from '@lib/meeting/graphql-ui/args';
import { MeetingActionResultObject } from '@lib/meeting/graphql-ui/objects';
import { Either } from '@lib/shared';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class EstimationTaskMutation {
  constructor(private readonly _commandBus: CommandBus) {}

  @Mutation(() => MeetingActionResultObject)
  async updateMemberEstimation(@Args() input: UpdateMemberEstimationArg) {
    const result = await this._commandBus.execute<
      UpdateMemberEstimationCommand,
      Either<void>
    >(new UpdateMemberEstimationCommand(input));
    if (result.isErr()) {
      return new MeetingActionResultObject(
        'failed',
        result.unwrapErr().message,
      );
    }
    return new MeetingActionResultObject('success');
  }
}
