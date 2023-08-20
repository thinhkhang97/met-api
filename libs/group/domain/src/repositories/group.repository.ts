import { BaseRepositoryPort, CUID } from '@lib/shared';

import { Group, GroupProps } from '../aggregates';

export abstract class GroupRepository extends BaseRepositoryPort<
  Group,
  GroupProps
> {
  public abstract getManyByUserId(userId: CUID): Promise<Group[]>;
}
