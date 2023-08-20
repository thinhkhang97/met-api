import { Group, GroupRepository } from '@lib/group/domain';
import { BaseQueryHandler, CUID } from '@lib/shared';
import { QueryHandler } from '@nestjs/cqrs';

import { GetGroupsQuery } from './get-groups.query';

@QueryHandler(GetGroupsQuery)
export class GetGroupsQueryHandler extends BaseQueryHandler<
  GetGroupsQuery,
  Group[]
> {
  constructor(private readonly _groupRepository: GroupRepository) {
    super();
  }

  protected handle(query: GetGroupsQuery): Promise<Group[]> {
    return this._groupRepository.getManyByUserId(new CUID(query.userId));
  }
}
