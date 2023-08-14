import { Provider } from '@nestjs/common';

import { GetGroupQueryHandler } from './get-group/get-group.query-handler';
import { GetMemberQueryHandler } from './get-member/get-member.query-handler';
import { GetMembersQueryHandler } from './get-members/get-members.query-handler';

export * from './get-group/get-group.query';
export * from './get-member/get-member.query';
export * from './get-members/get-members.query';

export const queries: Provider[] = [
  GetGroupQueryHandler,
  GetMemberQueryHandler,
  GetMembersQueryHandler,
];
