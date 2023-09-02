import { AddEstimationTaskCommand } from '@lib/meeting/application/commands/add-estimation-task/add-estimation-task.command';
import {
  EstimationMeetingRepository,
  MeetingNotFoundException,
  TaskEstimation,
} from '@lib/meeting/domain';
import { EstimationTaskTitle } from '@lib/meeting/domain/value-objects';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(AddEstimationTaskCommand)
export class AddEstimationTaskCommandHandler extends BaseCommandHandler<
  AddEstimationTaskCommand,
  TaskEstimation
> {
  constructor(
    private readonly _estimationMeetingRepository: EstimationMeetingRepository,
  ) {
    super();
  }

  async handle(command: AddEstimationTaskCommand): Promise<TaskEstimation> {
    const meetingId = new CUID(command.meetingId);
    const memberId = new CUID(command.memberId);
    const title = EstimationTaskTitle.create(command.title);
    const meeting = await this._estimationMeetingRepository.findOneByIdOrThrow(
      meetingId,
      new MeetingNotFoundException(),
    );
    const taskEstimation = meeting.addTaskEstimation(
      memberId,
      title,
      command.description,
    );
    await this._estimationMeetingRepository.upsert(meeting);
    return taskEstimation;
  }
}
