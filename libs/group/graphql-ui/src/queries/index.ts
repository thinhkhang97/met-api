import { Provider } from '@nestjs/common';

import { GroupQuery } from './group.query';
import { GroupsQuery } from './groups.query';
import { MemberQuery } from './member.query';

export * from './group.query';
export * from './member.query';

export const queries: Provider[] = [GroupsQuery, GroupQuery, MemberQuery];
