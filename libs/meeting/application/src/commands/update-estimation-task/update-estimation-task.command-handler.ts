import { UpdateEstimationTaskCommand } from '@lib/meeting/application/commands/update-estimation-task/update-estimation-task.command';
import {
  EstimationMeetingRepository,
  MeetingNotFoundException,
  TaskEstimation,
} from '@lib/meeting/domain';
import { TaskTitle } from '@lib/meeting/domain/value-objects';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateEstimationTaskCommand)
export class UpdateEstimationTaskCommandHandler extends BaseCommandHandler<
  UpdateEstimationTaskCommand,
  TaskEstimation
> {
  constructor(
    private readonly _estimationMeetingRepository: EstimationMeetingRepository,
  ) {
    super();
  }

  async handle(command: UpdateEstimationTaskCommand): Promise<TaskEstimation> {
    const meetingId = new CUID(command.meetingId);
    const taskEstimationId = new CUID(command.taskEstimationId);
    const title = TaskTitle.create(command.title);
    const meeting = await this._estimationMeetingRepository.findOneByIdOrThrow(
      meetingId,
      new MeetingNotFoundException(),
    );
    const taskEstimation = meeting.updateTaskEstimation(
      taskEstimationId,
      title,
      command.description,
    );
    await this._estimationMeetingRepository.upsert(meeting);
    return taskEstimation;
  }
}
