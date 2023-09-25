import {
  AddEstimationTaskCommand,
  CreateEstimationMeetingCommand,
  FinishEstimateTaskCommand,
  JoinMeetingCommand,
  RemoveEstimationTaskCommand,
  StartEstimateTaskCommand,
  UpdateEstimationTaskCommand,
  UpdateMeetingCommand,
  UpdateMemberRoleCommand,
} from '@lib/meeting/application';
import { EstimationMeeting, TaskEstimation } from '@lib/meeting/domain';
import { MemberRole } from '@lib/meeting/domain/constance';
import { Either, GraphQLUser, LoggedInUser } from '@lib/shared';
import { CommandBus } from '@nestjs/cqrs';
import {
  Args,
  GraphQLISODateTime,
  ID,
  Mutation,
  Resolver,
} from '@nestjs/graphql';

import { AddEstimationTaskArg, UpdateEstimationTaskArg } from '../args';
import {
  EstimationMeetingObject,
  MeetingActionResultObject,
  TaskEstimationObject,
} from '../objects';
import {
  AddEstimationTaskResult,
  CreateEstimationMeetingResultUnion,
  UpdateEstimationTaskResult,
} from '../unions';

@Resolver()
export class EstimationMeetingMutation {
  constructor(private readonly _commandBus: CommandBus) {}

  @Mutation(() => CreateEstimationMeetingResultUnion)
  async createEstimationMeeting(
    @Args({ type: () => ID, name: 'groupId' }) groupId: string,
    @Args({ type: () => String, name: 'title' }) title: string,
    @Args({ type: () => String, name: 'description', nullable: true })
    description: string,
    @Args({ type: () => GraphQLISODateTime, name: 'from' }) from: Date,
    @Args({ type: () => GraphQLISODateTime, name: 'to' }) to: Date,
    @GraphQLUser() loggedUser: LoggedInUser,
  ) {
    const result = await this._commandBus.execute<
      CreateEstimationMeetingCommand,
      Either<EstimationMeeting>
    >(
      new CreateEstimationMeetingCommand({
        groupId,
        title,
        description,
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
    @GraphQLUser() loggedUser: LoggedInUser,
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

  @Mutation(() => AddEstimationTaskResult)
  async addEstimationTask(
    @Args() input: AddEstimationTaskArg,
    @GraphQLUser() loggedInUser: LoggedInUser,
  ) {
    const result = await this._commandBus.execute<
      AddEstimationTaskCommand,
      Either<TaskEstimation>
    >(new AddEstimationTaskCommand({ ...input, userId: loggedInUser.id }));
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return new TaskEstimationObject(result.unwrap());
  }

  @Mutation(() => UpdateEstimationTaskResult)
  async updateEstimationTask(@Args() input: UpdateEstimationTaskArg) {
    const result = await this._commandBus.execute<
      UpdateEstimationTaskCommand,
      Either<TaskEstimation>
    >(new UpdateEstimationTaskCommand(input));
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return new TaskEstimationObject(result.unwrap());
  }

  @Mutation(() => MeetingActionResultObject)
  async removeEstimationTask(
    @Args({ type: () => ID, name: 'meetingId' }) meetingId: string,
    @Args({ type: () => ID, name: 'taskEstimationId' })
    taskEstimationId: string,
  ) {
    const result = await this._commandBus.execute<
      RemoveEstimationTaskCommand,
      Either<void>
    >(new RemoveEstimationTaskCommand({ meetingId, taskEstimationId }));
    if (result.isErr()) {
      return new MeetingActionResultObject(
        'failed',
        result.unwrapErr().message,
      );
    }
    return new MeetingActionResultObject('success');
  }

  @Mutation(() => MeetingActionResultObject)
  async startEstimateTask(
    @Args({ type: () => ID, name: 'meetingId' }) meetingId: string,
    @Args({ type: () => ID, name: 'taskEstimationId' })
    taskEstimationId: string,
  ) {
    const result = await this._commandBus.execute<
      StartEstimateTaskCommand,
      Either<void>
    >(new StartEstimateTaskCommand({ meetingId, taskEstimationId }));
    if (result.isErr()) {
      return new MeetingActionResultObject(
        'failed',
        result.unwrapErr().message,
      );
    }
    return new MeetingActionResultObject('success');
  }

  @Mutation(() => MeetingActionResultObject)
  async finishEstimateTask(
    @Args({ type: () => ID, name: 'meetingId' }) meetingId: string,
    @Args({ type: () => ID, name: 'taskEstimationId' })
    taskEstimationId: string,
  ) {
    const result = await this._commandBus.execute<
      FinishEstimateTaskCommand,
      Either<void>
    >(new FinishEstimateTaskCommand({ meetingId, taskEstimationId }));
    if (result.isErr()) {
      return new MeetingActionResultObject(
        'failed',
        result.unwrapErr().message,
      );
    }
    return new MeetingActionResultObject('success');
  }

  @Mutation(() => MeetingActionResultObject, { name: 'updateMeeting' })
  async updateMeeting(
    @Args({ type: () => String, name: 'meetingId' }) meetingId: string,
    @Args({ type: () => String, name: 'title' }) title: string,
    @Args({ type: () => String, name: 'description', nullable: true })
    description: string,
    @Args({ type: () => GraphQLISODateTime, name: 'from' }) from: Date,
    @Args({ type: () => GraphQLISODateTime, name: 'to' }) to: Date,
  ) {
    const result = await this._commandBus.execute<
      UpdateMeetingCommand,
      Either<void>
    >(new UpdateMeetingCommand({ meetingId, title, description, from, to }));
    if (result.isErr()) {
      return new MeetingActionResultObject(
        'failed',
        result.unwrapErr().message,
      );
    }
    return new MeetingActionResultObject('success');
  }

  @Mutation(() => MeetingActionResultObject, { name: 'updateMemberRole' })
  async updateMemberRole(
    @Args({ type: () => String, name: 'meetingId' }) meetingId: string,
    @Args({ type: () => MemberRole, name: 'role' }) role: MemberRole,
    @GraphQLUser() loggedInUser: LoggedInUser,
  ) {
    const result = await this._commandBus.execute<
      UpdateMemberRoleCommand,
      Either<void>
    >(
      new UpdateMemberRoleCommand({ meetingId, role, userId: loggedInUser.id }),
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
