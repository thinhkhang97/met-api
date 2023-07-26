import { Member } from '@prisma/group-client';

import { RoleOrmEntity } from './role.orm-entity';

export interface MemberOrmEntity extends Member {
  roles: RoleOrmEntity[];
}
