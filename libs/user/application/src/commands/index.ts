import { LoginCommandHandler } from '@lib/user/application/commands/login/login.command-handler';
import { RegisterCommandHandler } from '@lib/user/application/commands/register/register.command-handler';
import { Provider } from '@nestjs/common';

import { UpdateNameCommandHandler } from './update-name/update-name.command-handler';

export * from './login/login.command';
export * from './register/register.command';
export * from './update-name/update-name.command';

export const commands: Provider[] = [
  RegisterCommandHandler,
  LoginCommandHandler,
  UpdateNameCommandHandler,
];
