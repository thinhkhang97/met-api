import { Provider } from '@nestjs/common';

import { MembersResolveField } from './members.resolve-field';

export const resolveFields: Provider[] = [MembersResolveField];
