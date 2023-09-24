import { GroupService } from '@lib/group/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { LeaveGroupCommand } from './leave-group.command';

@CommandHandler(LeaveGroupCommand)
export class LeaveGroupCommandHandler extends BaseCommandHandler<
  LeaveGroupCommand,
  void
> {
  constructor(private readonly _groupService: GroupService) {
    super();
  }
  async handle(command: LeaveGroupCommand): Promise<void> {
    await this._groupService.leaveGroup(
      new CUID(command.groupId),
      new CUID(command.userId),
    );
  }
}
