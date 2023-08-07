import { BaseRepositoryPort } from '@lib/shared';

import { Group, GroupProps } from '../aggregates';

export abstract class GroupRepository extends BaseRepositoryPort<
  Group,
  GroupProps
> {}
