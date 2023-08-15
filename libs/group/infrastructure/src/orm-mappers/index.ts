import { Provider } from '@nestjs/common';

import { GroupOrmMapper } from './group.orm-mapper';
import { MemberOrmMapper } from './member.orm-mapper';
import { RoleOrmMapper } from './role.orm-mapper';

export const ormMappers: Provider[] = [
  GroupOrmMapper,
  MemberOrmMapper,
  RoleOrmMapper,
];

export { GroupOrmMapper, MemberOrmMapper, RoleOrmMapper };
