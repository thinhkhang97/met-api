import { EstimationMeetingService } from '@lib/meeting/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateMemberRoleCommand } from './update-member-role.command';

@CommandHandler(UpdateMemberRoleCommand)
export class UpdateMemberRoleCommandHandler extends BaseCommandHandler<
  UpdateMemberRoleCommand,
  void
> {
  constructor(
    private readonly _estimationMeetingService: EstimationMeetingService,
  ) {
    super();
  }
  async handle(command: UpdateMemberRoleCommand): Promise<void> {
    return await this._estimationMeetingService.updateMemberRole(
      new CUID(command.meetingId),
      new CUID(command.userId),
      command.role,
    );
  }
}
