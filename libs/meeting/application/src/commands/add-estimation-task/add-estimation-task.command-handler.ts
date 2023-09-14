import { AddEstimationTaskCommand } from '@lib/meeting/application/commands/add-estimation-task/add-estimation-task.command';
import { EstimationMeetingService, TaskEstimation } from '@lib/meeting/domain';
import { TaskTitle } from '@lib/meeting/domain/value-objects';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(AddEstimationTaskCommand)
export class AddEstimationTaskCommandHandler extends BaseCommandHandler<
  AddEstimationTaskCommand,
  TaskEstimation
> {
  constructor(
    private readonly _estimationMeetingService: EstimationMeetingService,
  ) {
    super();
  }

  async handle(command: AddEstimationTaskCommand): Promise<TaskEstimation> {
    const meetingId = new CUID(command.meetingId);
    const userId = new CUID(command.userId);
    const title = TaskTitle.create(command.title);
    return await this._estimationMeetingService.addTaskEstimation(
      userId,
      meetingId,
      title,
      command.description,
    );
  }
}
