import {
  CreateEstimationMeetingCommand,
  JoinMeetingCommand,
} from '@lib/meeting/application';
import { EstimationMeeting } from '@lib/meeting/domain';
import { Either, GraphQLUser, LoggedUser } from '@lib/shared';
import { CommandBus } from '@nestjs/cqrs';
import {
  Args,
  GraphQLISODateTime,
  ID,
  Mutation,
  Resolver,
} from '@nestjs/graphql';

import { EstimationMeetingObject, MeetingActionResultObject } from '../objects';
import { CreateEstimationMeetingResultUnion } from '../unions';

@Resolver()
export class EstimationMeetingMutation {
  constructor(private readonly _commandBus: CommandBus) {}

  @Mutation(() => CreateEstimationMeetingResultUnion)
  async createEstimationMeeting(
    @Args({ type: () => ID, name: 'groupId' }) groupId: string,
    @Args({ type: () => String, name: 'title' }) title: string,
    @Args({ type: () => GraphQLISODateTime, name: 'from' }) from: Date,
    @Args({ type: () => GraphQLISODateTime, name: 'to' }) to: Date,
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
        from,
        to,
      }),
    );
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return new EstimationMeetingObject(result.unwrap());
  }

  @Mutation(() => MeetingActionResultObject)
  async joinEstimationMeeting(
    @Args({ type: () => ID, name: 'meetingId' }) meetingId: string,
    @GraphQLUser() loggedUser: LoggedUser,
  ) {
    const result = await this._commandBus.execute<
      JoinMeetingCommand,
      Either<void>
    >(
      new JoinMeetingCommand({
        meetingId,
        userId: loggedUser.id,
      }),
    );

    if (result.isErr()) {
      return new MeetingActionResultObject(
        'failed',
        result.unwrapErr().message,
      );
    }

    return new MeetingActionResultObject('success');
  }
}
