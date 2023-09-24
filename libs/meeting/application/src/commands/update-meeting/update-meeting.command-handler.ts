import { UpdateMeetingCommand } from '@lib/meeting/application/commands/update-meeting/update-meeting.command';
import {
  EstimationMeetingRepository,
  MeetingNotFoundException,
} from '@lib/meeting/domain';
import { BaseCommandHandler, CUID, DateVO } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateMeetingCommand)
export class UpdateMeetingCommandHandler extends BaseCommandHandler<
  UpdateMeetingCommand,
  void
> {
  constructor(
    private readonly _meetingRepository: EstimationMeetingRepository,
  ) {
    super();
  }
  async handle(command: UpdateMeetingCommand): Promise<void> {
    const meeting = await this._meetingRepository.findOneByIdOrThrow(
      new CUID(command.meetingId),
      new MeetingNotFoundException(),
    );
    meeting.updateTitle(command.title);
    meeting.updateDescription(command.description);
    meeting.updateFrom(new DateVO(command.from));
    meeting.updateTo(new DateVO(command.to));
    await this._meetingRepository.upsert(meeting);
  }
}
