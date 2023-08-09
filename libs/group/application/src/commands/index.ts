import { Provider } from '@nestjs/common';

import { AddMemberCommandHandler } from './add-member/add-member.command-handler';
import { CreateGroupCommandHandler } from './create-group/create-group.command-handler';

export * from './add-member/add-member.command';
export * from './create-group/create-group.command';

export const commands: Provider[] = [
  CreateGroupCommandHandler,
  AddMemberCommandHandler,
];
