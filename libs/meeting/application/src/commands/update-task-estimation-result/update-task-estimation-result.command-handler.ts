import { UpdateTaskEstimationResultCommand } from '@lib/meeting/application/commands/update-task-estimation-result/update-task-estimation-result.command';
import {
  TaskEstimationNotFoundException,
  TaskEstimationRepository,
} from '@lib/meeting/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateTaskEstimationResultCommand)
export class UpdateTaskEstimationResultCommandHandler extends BaseCommandHandler<
  UpdateTaskEstimationResultCommand,
  void
> {
  constructor(
    private readonly _taskEstimationRepository: TaskEstimationRepository,
  ) {
    super();
  }

  async handle(command: UpdateTaskEstimationResultCommand): Promise<void> {
    const taskEstimationId = new CUID(command.taskEstimationId);
    const taskEstimation =
      await this._taskEstimationRepository.findOneByIdOrThrow(
        taskEstimationId,
        new TaskEstimationNotFoundException(),
      );
    taskEstimation.updateAverageEstimation();
    await this._taskEstimationRepository.upsert(taskEstimation);
  }
}
