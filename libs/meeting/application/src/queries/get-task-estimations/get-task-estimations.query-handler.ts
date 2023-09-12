import { GetTaskEstimationsQuery } from '@lib/meeting/application/queries/get-task-estimations/get-task-estimations.query';
import { TaskEstimation, TaskEstimationRepository } from '@lib/meeting/domain';
import { BaseQueryHandler, CUID } from '@lib/shared';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTaskEstimationsQuery)
export class GetTaskEstimationsQueryHandler extends BaseQueryHandler<
  GetTaskEstimationsQuery,
  TaskEstimation[]
> {
  constructor(
    private readonly _taskEstimationRepository: TaskEstimationRepository,
  ) {
    super();
  }

  protected async handle(
    query: GetTaskEstimationsQuery,
  ): Promise<TaskEstimation[]> {
    return await this._taskEstimationRepository.findMany({
      meetingId: new CUID(query.meetingId),
    });
  }
}
