import { AddEstimationTaskCommand } from '@lib/meeting/application/commands/add-estimation-task/add-estimation-task.command';
import {
  EstimationMeetingRepository,
  MeetingNotFoundException,
  TaskEstimation,
} from '@lib/meeting/domain';
import { TaskTitle } from '@lib/meeting/domain/value-objects';
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

  /**
   * TODO: We should move this logic to service layer and don't just input memberId
   *  We should use userId then call group service to get memberId instead
   * @param command
   */
  async handle(command: AddEstimationTaskCommand): Promise<TaskEstimation> {
    const meetingId = new CUID(command.meetingId);
    const memberId = new CUID(command.memberId);
    const title = TaskTitle.create(command.title);
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
