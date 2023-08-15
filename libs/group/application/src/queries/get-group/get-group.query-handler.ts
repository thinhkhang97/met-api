import { GetGroupQuery } from '@lib/group/application/queries/get-group/get-group.query';
import {
  Group,
  GroupNotFoundException,
  GroupRepository,
} from '@lib/group/domain';
import { BaseQueryHandler, CUID } from '@lib/shared';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetGroupQuery)
export class GetGroupQueryHandler extends BaseQueryHandler<
  GetGroupQuery,
  Group
> {
  constructor(private readonly _groupRepository: GroupRepository) {
    super();
  }

  protected async handle(query: GetGroupQuery): Promise<Group> {
    return await this._groupRepository.findOneByIdOrThrow(
      new CUID(query.groupId),
      new GroupNotFoundException(),
    );
  }
}
