import { Group } from '@lib/group/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateGroupCommand } from './create-group.command';

@CommandHandler(CreateGroupCommand)
export class CreateGroupCommandHandler extends BaseCommandHandler<
  CreateGroupCommand,
  Group
> {
  handle(command: CreateGroupCommand): Group {
    const userId = new CUID(command.userId);
    return Group.create({
      userId,
      name: command.groupName,
      ownerName: command.ownerName,
    });
  }
}
