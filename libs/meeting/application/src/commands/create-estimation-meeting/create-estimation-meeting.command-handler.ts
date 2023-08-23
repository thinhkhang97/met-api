import {
  EstimationMeeting,
  EstimationMeetingRepository,
} from '@lib/meeting/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateEstimationMeetingCommand } from './create-estimation-meeting.command';

@CommandHandler(CreateEstimationMeetingCommand)
export class CreateEstimationMeetingCommandHandler extends BaseCommandHandler<
  CreateEstimationMeetingCommand,
  EstimationMeeting
> {
  constructor(
    private readonly _estimationMeetingRepository: EstimationMeetingRepository,
  ) {
    super();
  }

  async handle(
    command: CreateEstimationMeetingCommand,
  ): Promise<EstimationMeeting> {
    const estimationMeeting = EstimationMeeting.create({
      title: command.title,
      groupId: new CUID(command.groupId),
    });
    return this._estimationMeetingRepository.create(estimationMeeting);
  }
}
