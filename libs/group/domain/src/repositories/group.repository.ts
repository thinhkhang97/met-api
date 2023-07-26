import { BaseRepositoryPort } from '@lib/shared';

import { Group, GroupProps } from '../aggregates';

export abstract class GroupRepositoryPort extends BaseRepositoryPort<
  Group,
  GroupProps
> {}
