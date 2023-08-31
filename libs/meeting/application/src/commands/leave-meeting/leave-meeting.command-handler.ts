import { EstimationMeetingService } from '@lib/meeting/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { LeaveMeetingCommand } from './leave-meeting.command';

@CommandHandler(LeaveMeetingCommand)
export class LeaveMeetingCommandHandler extends BaseCommandHandler<
  LeaveMeetingCommand,
  void
> {
  constructor(private readonly _meetingService: EstimationMeetingService) {
    super();
  }

  async handle(command: LeaveMeetingCommand): Promise<void> {
    await this._meetingService.removeMember(
      new CUID(command.meetingId),
      new CUID(command.memberId),
    );
  }
}
