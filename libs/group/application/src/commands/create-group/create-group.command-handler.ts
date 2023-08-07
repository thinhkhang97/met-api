import { Group, GroupRepository } from '@lib/group/domain';
import { BaseCommandHandler, CUID } from '@lib/shared';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateGroupCommand } from './create-group.command';

@CommandHandler(CreateGroupCommand)
export class CreateGroupCommandHandler extends BaseCommandHandler<
  CreateGroupCommand,
  Group
> {
  constructor(private readonly _groupRepository: GroupRepository) {
    super();
  }

  async handle(command: CreateGroupCommand): Promise<Group> {
    const userId = new CUID(command.userId);
    const group = Group.create({
      userId,
      name: command.groupName,
      ownerName: command.ownerName,
    });
    await this._groupRepository.save(group);
    return group;
  }
}
