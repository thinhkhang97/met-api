import { EstimationMeetingService } from '@lib/meeting/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { StartEstimateTaskCommand } from './start-estimate-task.command';

@CommandHandler(StartEstimateTaskCommand)
export class StartEstimateTaskCommandHandler extends BaseCommandHandler<
  StartEstimateTaskCommand,
  void
> {
  constructor(
    private readonly _estimationMeetingService: EstimationMeetingService,
  ) {
    super();
  }

  async handle(command: StartEstimateTaskCommand): Promise<void> {
    await this._estimationMeetingService.startEstimateTask(
      new CUID(command.meetingId),
      new CUID(command.taskEstimationId),
    );
  }
}
