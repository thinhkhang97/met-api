import { BaseRepositoryPort } from '@lib/shared';

import { Role, RoleProps } from '../entities';

export abstract class RoleRepository extends BaseRepositoryPort<
  Role,
  RoleProps
> {}
