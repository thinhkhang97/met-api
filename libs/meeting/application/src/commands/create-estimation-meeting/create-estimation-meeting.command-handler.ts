import { EstimationMeeting } from '@lib/meeting/domain';
import { EstimationMeetingService } from '@lib/meeting/infrastructure/services/estimation-meeting.service';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateEstimationMeetingCommand } from './create-estimation-meeting.command';

@CommandHandler(CreateEstimationMeetingCommand)
export class CreateEstimationMeetingCommandHandler extends BaseCommandHandler<
  CreateEstimationMeetingCommand,
  EstimationMeeting
> {
  constructor(
    private readonly _estimationMeetingService: EstimationMeetingService,
  ) {
    super();
  }

  async handle(
    command: CreateEstimationMeetingCommand,
  ): Promise<EstimationMeeting> {
    return this._estimationMeetingService.create(
      new CUID(command.groupId),
      new CUID(command.userId),
      command.title,
    );
  }
}
