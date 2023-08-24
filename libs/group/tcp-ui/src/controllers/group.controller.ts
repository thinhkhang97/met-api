import { GetGroupQuery } from '@lib/group/application/queries';
import { Group } from '@lib/group/domain';
import { Either } from '@lib/shared';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';

import { GetGroupByIdDto } from '../dtos';

@Controller('internal')
export class GroupController {
  constructor(private readonly _queryBus: QueryBus) {}

  @MessagePattern({ action: 'get-group-by-id' })
  async getGroupById({ groupId, userId }: GetGroupByIdDto) {
    const result = await this._queryBus.execute<GetGroupByIdDto, Either<Group>>(
      new GetGroupQuery({ groupId: groupId, userId }),
    );
    if (result.isErr()) {
      return null;
    }
    const group = result.unwrap().getProps();
    return {
      id: group.id.unpack(),
      name: group.name,
    };
  }
}
