import { Provider } from '@nestjs/common';

import { AddMemberCommandHandler } from './add-member/add-member.command-handler';
import { CreateGroupCommandHandler } from './create-group/create-group.command-handler';
import { RemoveMemberCommandHandler } from './remove-member/remove-member.command-handler';

export * from './add-member/add-member.command';
export * from './create-group/create-group.command';
export * from './remove-member/remove-member.command';

export const commands: Provider[] = [
  CreateGroupCommandHandler,
  AddMemberCommandHandler,
  RemoveMemberCommandHandler,
];
