import { Provider } from '@nestjs/common';

import { GetGroupQueryHandler } from './get-group/get-group.query-handler';
import { GetGroupsQueryHandler } from './get-groups/get-groups.query-handler';
import { GetMemberQueryHandler } from './get-member/get-member.query-handler';
import { GetMemberByUserIdQueryHandler } from './get-member-by-user-id/get-member-by-user-id.query-handler';
import { GetMembersQueryHandler } from './get-members/get-members.query-handler';

export * from './get-group/get-group.query';
export * from './get-groups/get-groups.query';
export * from './get-member/get-member.query';
export * from './get-member-by-user-id/get-member-by-user-id.query';
export * from './get-members/get-members.query';

export const queries: Provider[] = [
  GetGroupQueryHandler,
  GetGroupsQueryHandler,
  GetMemberQueryHandler,
  GetMembersQueryHandler,
  GetMemberByUserIdQueryHandler,
];
