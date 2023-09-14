import { EstimationMeetingService } from '@lib/meeting/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { JoinMeetingCommand } from './join-meeting.command';

@CommandHandler(JoinMeetingCommand)
export class JoinMeetingCommandHandler extends BaseCommandHandler<
  JoinMeetingCommand,
  void
> {
  constructor(
    private readonly _estimationMeetingService: EstimationMeetingService,
  ) {
    super();
  }

  async handle(command: JoinMeetingCommand): Promise<void> {
    await this._estimationMeetingService.addMember(
      new CUID(command.meetingId),
      new CUID(command.userId),
    );
  }
}
