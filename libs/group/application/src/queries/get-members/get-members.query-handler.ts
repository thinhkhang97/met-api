import { Member, MemberRepository } from '@lib/group/domain';
import { MemberStatus } from '@lib/group/domain/constant';
import { BaseQueryHandler, CUID } from '@lib/shared';
import { QueryHandler } from '@nestjs/cqrs';

import { GetMembersQuery } from './get-members.query';

@QueryHandler(GetMembersQuery)
export class GetMembersQueryHandler extends BaseQueryHandler<
  GetMembersQuery,
  Member[]
> {
  constructor(private readonly _memberRepository: MemberRepository) {
    super();
  }

  protected async handle(query: GetMembersQuery): Promise<Member[]> {
    const userId = new CUID(query.userId);
    const groupId = new CUID(query.groupId);
    const memberInGroup = await this._memberRepository.findOne({
      userId,
      groupId,
    });
    if (!memberInGroup) {
      return [];
    }
    return await this._memberRepository.findMany({
      groupId,
      status: MemberStatus.ACTIVE,
    });
  }
}
