import { AddMemberCommand } from '@lib/group/application/commands/add-member/add-member.command';
import { GroupService } from '@lib/group/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(AddMemberCommand)
export class AddMemberCommandHandler extends BaseCommandHandler<
  AddMemberCommand,
  void
> {
  constructor(private readonly _groupService: GroupService) {
    super();
  }

  async handle(command: AddMemberCommand): Promise<void> {
    const userId = new CUID(command.userId);
    const groupId = new CUID(command.groupId);
    const memberId = new CUID(command.memberId);
    await this._groupService.addMember(command.name, groupId, userId, memberId);
  }
}
