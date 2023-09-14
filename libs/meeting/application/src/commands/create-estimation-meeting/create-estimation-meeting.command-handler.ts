import {
  EstimationMeeting,
  EstimationMeetingService,
} from '@lib/meeting/domain';
import { BaseCommandHandler, CUID, DateVO } from '@lib/shared';
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
      command.description,
      new DateVO(command.from),
      new DateVO(command.to),
    );
  }
}
