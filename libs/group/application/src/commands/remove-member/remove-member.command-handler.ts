import { GroupService } from '@lib/group/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { RemoveMemberCommand } from './remove-member.command';

@CommandHandler(RemoveMemberCommand)
export class RemoveMemberCommandHandler extends BaseCommandHandler<
  RemoveMemberCommand,
  void
> {
  constructor(private readonly _groupService: GroupService) {
    super();
  }

  async handle(command: RemoveMemberCommand): Promise<void> {
    const groupId = new CUID(command.groupId);
    const memberId = new CUID(command.memberId);
    const userId = new CUID(command.userId);
    return await this._groupService.removeMember(groupId, memberId, userId);
  }
}
