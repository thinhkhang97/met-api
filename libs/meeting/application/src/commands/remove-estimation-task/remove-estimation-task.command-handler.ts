import { RemoveEstimationTaskCommand } from '@lib/meeting/application/commands/remove-estimation-task/remove-estimation-task.command';
import {
  EstimationMeetingRepository,
  MeetingNotFoundException,
} from '@lib/meeting/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveEstimationTaskCommand)
export class RemoveEstimationTaskCommandHandler extends BaseCommandHandler<
  RemoveEstimationTaskCommand,
  void
> {
  constructor(
    private readonly _estimationMeetingRepository: EstimationMeetingRepository,
  ) {
    super();
  }

  async handle(command: RemoveEstimationTaskCommand): Promise<void> {
    const meetingId = new CUID(command.meetingId);
    const taskEstimationId = new CUID(command.taskEstimationId);
    const meeting = await this._estimationMeetingRepository.findOneByIdOrThrow(
      meetingId,
      new MeetingNotFoundException(),
    );
    meeting.removeTaskEstimation(taskEstimationId);
    await this._estimationMeetingRepository.upsert(meeting);
  }
}
