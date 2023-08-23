import { BaseCommandHandler, Email } from '@lib/shared';
import { RegisterCommand } from '@lib/user/application/commands/register/register.command';
import { User, UserRepository } from '@lib/user/domain';
import { UserExistException } from '@lib/user/domain/exceptions/user-exist.exception';
import { Password } from '@lib/user/domain/value-objects/password';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler extends BaseCommandHandler<
  RegisterCommand,
  void
> {
  constructor(private readonly _userRepository: UserRepository) {
    super();
  }

  async handle(command: RegisterCommand): Promise<void> {
    const email = new Email(command.email);
    const password = await Password.create(command.password);
    const existUser = await this._userRepository.findOne({ email });

    if (existUser) {
      throw new UserExistException();
    }

    const user = User.create(email, password);
    await this._userRepository.upsert(user);
  }
}
