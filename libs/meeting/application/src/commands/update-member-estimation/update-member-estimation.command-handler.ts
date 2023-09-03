import { EstimationMeetingService } from '@lib/meeting/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateMemberEstimationCommand } from './update-member-estimation.command';

@CommandHandler(UpdateMemberEstimationCommand)
export class UpdateMemberEstimationCommandHandler extends BaseCommandHandler<
  UpdateMemberEstimationCommand,
  void
> {
  constructor(
    private readonly _estimationMeetingService: EstimationMeetingService,
  ) {
    super();
  }

  async handle(command: UpdateMemberEstimationCommand): Promise<void> {
    const meetingId = new CUID(command.meetingId);
    const memberMeetingId = new CUID(command.meetingMemberId);
    const taskEstimationId = new CUID(command.taskEstimationId);
    return await this._estimationMeetingService.updateMemberEstimation(
      meetingId,
      memberMeetingId,
      taskEstimationId,
      command.estimationValue,
    );
  }
}
