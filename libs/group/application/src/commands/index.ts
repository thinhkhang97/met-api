import { CreateGroupCommandHandler } from '@lib/group/application/commands/create-group/create-group.command-handler';
import { Provider } from '@nestjs/common';

export * from './create-group/create-group.command';

export const commands: Provider[] = [CreateGroupCommandHandler];
