import { BaseRepositoryPort, CUID, Nullable } from '@lib/shared';

import { Group, GroupProps } from '../aggregates';

export abstract class GroupRepository extends BaseRepositoryPort<
  Group,
  GroupProps
> {
  public abstract findManyByUserId(userId: CUID): Promise<Group[]>;

  public abstract findOneByUserId(
    userId: CUID,
    groupId: CUID,
  ): Promise<Nullable<Group>>;
}
