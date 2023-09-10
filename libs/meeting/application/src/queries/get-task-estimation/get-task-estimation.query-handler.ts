import { GetTaskEstimationQuery } from '@lib/meeting/application/queries/get-task-estimation/get-task-estimation.query';
import {
  TaskEstimation,
  TaskEstimationNotFoundException,
  TaskEstimationRepository,
} from '@lib/meeting/domain';
import { BaseQueryHandler, CUID } from '@lib/shared';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTaskEstimationQuery)
export class GetTaskEstimationQueryHandler extends BaseQueryHandler<
  GetTaskEstimationQuery,
  TaskEstimation
> {
  constructor(
    private readonly _taskEstimationRepository: TaskEstimationRepository,
  ) {
    super();
  }

  protected async handle(
    query: GetTaskEstimationQuery,
  ): Promise<TaskEstimation> {
    return await this._taskEstimationRepository.findOneByIdOrThrow(
      new CUID(query.taskEstimationId),
      new TaskEstimationNotFoundException(),
    );
  }
}
