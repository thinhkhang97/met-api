import { UpdateTaskEstimationResultCommand } from '@lib/meeting/application';
import { Either } from '@lib/shared';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class TaskEstimationService {
  constructor(private readonly _commandBus: CommandBus) {}

  async updateTaskEstimation(taskEstimationId: string) {
    await this._commandBus.execute<
      UpdateTaskEstimationResultCommand,
      Either<void>
    >(new UpdateTaskEstimationResultCommand({ taskEstimationId }));
  }
}
