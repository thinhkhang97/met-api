import {
  GetGroupQuery,
  GetMemberByUserIdQuery,
} from '@lib/group/application/queries';
import { Group, Member } from '@lib/group/domain';
import { Either } from '@lib/shared';
import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';

import { GetGroupByIdDto, GetMemberByUserIdDto } from '../dtos';

@Controller('internal')
export class GroupController {
  constructor(private readonly _queryBus: QueryBus) {}

  @MessagePattern({ action: 'get-group-by-id' })
  async getGroupById({ groupId, userId }: GetGroupByIdDto) {
    const result = await this._queryBus.execute<GetGroupQuery, Either<Group>>(
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

  @MessagePattern({ action: 'get-member-by-user-id' })
  async getMemberById({ userId, groupId }: GetMemberByUserIdDto) {
    const result = await this._queryBus.execute<
      GetMemberByUserIdQuery,
      Either<Member>
    >(new GetMemberByUserIdQuery({ userId, groupId }));
    if (result.isErr()) {
      return null;
    }
    const member = result.unwrap().getProps();
    return {
      id: member.id.unpack(),
      name: member.name,
    };
  }
}
