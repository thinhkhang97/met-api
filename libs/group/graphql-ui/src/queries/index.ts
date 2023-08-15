import { Provider } from '@nestjs/common';

import { GroupQuery } from './group.query';
import { MemberQuery } from './member.query';

export * from './group.query';
export * from './member.query';

export const queries: Provider[] = [GroupQuery, MemberQuery];
