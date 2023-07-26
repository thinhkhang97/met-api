import { BaseRepositoryPort } from '@lib/shared';

import { Role, RoleProps } from '../entities';

export abstract class RoleRepositoryPort extends BaseRepositoryPort<
  Role,
  RoleProps
> {}
