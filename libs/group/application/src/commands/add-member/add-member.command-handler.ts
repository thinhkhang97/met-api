import { AddMemberCommand } from '@lib/group/application/commands/add-member/add-member.command';
import { GroupService, Member } from '@lib/group/domain';
import { BaseCommandHandler, CUID, Email } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(AddMemberCommand)
export class AddMemberCommandHandler extends BaseCommandHandler<
  AddMemberCommand,
  Member
> {
  constructor(private readonly _groupService: GroupService) {
    super();
  }

  async handle(command: AddMemberCommand): Promise<Member> {
    const userId = new CUID(command.userId);
    const groupId = new CUID(command.groupId);
    const email = new Email(command.email);
    return await this._groupService.addMember(
      command.name,
      groupId,
      userId,
      email,
    );
  }
}
