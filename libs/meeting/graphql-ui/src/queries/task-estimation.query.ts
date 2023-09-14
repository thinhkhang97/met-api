import {
  GetTaskEstimationQuery,
  GetTaskEstimationsQuery,
} from '@lib/meeting/application';
import { TaskEstimation } from '@lib/meeting/domain';
import { Either } from '@lib/shared';
import { QueryBus } from '@nestjs/cqrs';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';

import { TaskEstimationObject } from '../objects';
import { TaskEstimationResultUnion } from '../unions';

@Resolver()
export class TaskEstimationQuery {
  constructor(private readonly _queryBus: QueryBus) {}

  @Query(() => TaskEstimationResultUnion, { name: 'taskEstimation' })
  public async getTaskEstimationId(
    @Args({ type: () => ID, name: 'taskEstimationId' })
    taskEstimationId: string,
  ) {
    const result = await this._queryBus.execute<
      GetTaskEstimationQuery,
      Either<TaskEstimation>
    >(new GetTaskEstimationQuery({ taskEstimationId }));
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return new TaskEstimationObject(result.unwrap());
  }

  @Query(() => [TaskEstimationObject], { name: 'taskEstimations' })
  public async getTaskEstimations(
    @Args({ type: () => ID, name: 'meetingId' })
    meetingId: string,
  ) {
    const result = await this._queryBus.execute<
      GetTaskEstimationsQuery,
      Either<TaskEstimation[]>
    >(new GetTaskEstimationsQuery({ meetingId }));
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return result
      .unwrap()
      .map((taskEstimation) => new TaskEstimationObject(taskEstimation));
  }
}
