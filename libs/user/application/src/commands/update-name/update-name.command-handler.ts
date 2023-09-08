import { BaseCommandHandler, CUID } from '@lib/shared';
import {
  Username,
  UserNotFoundException,
  UserRepository,
} from '@lib/user/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateNameCommand } from './update-name.command';

@CommandHandler(UpdateNameCommand)
export class UpdateNameCommandHandler extends BaseCommandHandler<
  UpdateNameCommand,
  void
> {
  constructor(public readonly _userRepository: UserRepository) {
    super();
  }

  async handle(command: UpdateNameCommand): Promise<void> {
    const name = new Username(command.name);
    const user = await this._userRepository.findOneByIdOrThrow(
      new CUID(command.userId),
      new UserNotFoundException(),
    );
    user.updateName(name);
    await this._userRepository.upsert(user);
  }
}
