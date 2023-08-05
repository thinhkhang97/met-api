import { Group } from '@prisma/group-client';

import { MemberOrmEntity } from './member.orm-entity';
import { RoleOrmEntity } from './role.orm-entity';

export interface GroupOrmEntity extends Group {
  roles: RoleOrmEntity[];
  members: MemberOrmEntity[];
}
