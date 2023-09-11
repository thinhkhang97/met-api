import { EstimationMeetingService } from '@lib/meeting/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { FinishEstimateTaskCommand } from './finish-estimate-task.command';

@CommandHandler(FinishEstimateTaskCommand)
export class FinishEstimateTaskCommandHandler extends BaseCommandHandler<
  FinishEstimateTaskCommand,
  void
> {
  constructor(
    private readonly _estimationMeetingService: EstimationMeetingService,
  ) {
    super();
  }

  async handle(command: FinishEstimateTaskCommand): Promise<void> {
    await this._estimationMeetingService.finishEstimateTask(
      new CUID(command.meetingId),
      new CUID(command.taskEstimationId),
    );
  }
}
