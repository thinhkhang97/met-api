import { BaseCommandHandler, Email } from '@lib/shared';
import { UserNotFoundException, UserRepository } from '@lib/user/domain';
import { Password } from '@lib/user/domain/value-objects/password';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler extends BaseCommandHandler<
  LoginCommand,
  {
    accessToken: string;
    refreshToken: string;
  }
> {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
  ) {
    super();
  }

  async handle(command: LoginCommand): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this._userRepository.findOne({
      email: new Email(command.email),
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    await user.password.compareWith(new Password(command.password));
    const userProps = user.getProps();
    const payload = {
      id: userProps.id.unpack(),
      email: userProps.email.unpack(),
    };
    return {
      accessToken: await this._jwtService.signAsync(payload, {
        secret: this._configService.getOrThrow<string>('JWT_SECRET'),
        expiresIn: '7d',
      }),
      refreshToken: await this._jwtService.signAsync(payload, {
        secret: this._configService.getOrThrow<string>('JWT_SECRET'),
        expiresIn: '30d',
      }),
    };
  }
}
