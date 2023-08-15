import {
  GroupRepository,
  MemberRepository,
  RoleRepository,
} from '@lib/group/domain';
import { Provider } from '@nestjs/common';

import { GroupPrismaRepository } from './group.prisma-repository';
import { MemberPrismaRepository } from './member.prisma-repository';
import { RolePrismaRepository } from './role.prisma-repository';

export const repositories: Provider[] = [
  {
    provide: RoleRepository,
    useClass: RolePrismaRepository,
  },
  {
    provide: MemberRepository,
    useClass: MemberPrismaRepository,
  },
  {
    provide: GroupRepository,
    useClass: GroupPrismaRepository,
  },
];
