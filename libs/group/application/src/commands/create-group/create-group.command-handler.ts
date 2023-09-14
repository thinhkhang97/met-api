import { Group, GroupService } from '@lib/group/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateGroupCommand } from './create-group.command';

@CommandHandler(CreateGroupCommand)
export class CreateGroupCommandHandler extends BaseCommandHandler<
  CreateGroupCommand,
  Group
> {
  constructor(private readonly _groupService: GroupService) {
    super();
  }

  async handle(command: CreateGroupCommand): Promise<Group> {
    const userId = new CUID(command.userId);
    return await this._groupService.createGroup(
      userId,
      command.groupName,
      command.description,
    );
  }
}
