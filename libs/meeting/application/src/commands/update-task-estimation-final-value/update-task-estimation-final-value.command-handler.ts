import { EstimationMeetingService } from '@lib/meeting/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateTaskEstimationFinalValueCommand } from './update-task-estimation-final-value.command';

@CommandHandler(UpdateTaskEstimationFinalValueCommand)
export class UpdateTaskEstimationFinalValueCommandHandler extends BaseCommandHandler<
  UpdateTaskEstimationFinalValueCommand,
  void
> {
  constructor(
    private readonly _estimationMeetingService: EstimationMeetingService,
  ) {
    super();
  }
  async handle(command: UpdateTaskEstimationFinalValueCommand): Promise<void> {
    await this._estimationMeetingService.updateFinalEstimation(
      new CUID(command.meetingId),
      new CUID(command.userId),
      new CUID(command.taskEstimationId),
      command.finalEstimation,
    );
  }
}
