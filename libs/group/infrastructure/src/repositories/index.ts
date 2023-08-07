import {
  GroupRepository,
  MemberRepositoryPort,
  RoleRepositoryPort,
} from '@lib/group/domain';
import { Provider } from '@nestjs/common';

import { GroupPrismaRepository } from './group.prisma-repository';
import { MemberPrismaRepository } from './member.prisma-repository';
import { RolePrismaRepository } from './role.prisma-repository';

export const repositories: Provider[] = [
  {
    provide: RoleRepositoryPort,
    useClass: RolePrismaRepository,
  },
  {
    provide: MemberRepositoryPort,
    useClass: MemberPrismaRepository,
  },
  {
    provide: GroupRepository,
    useClass: GroupPrismaRepository,
  },
];
