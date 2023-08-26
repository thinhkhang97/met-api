import {
  Member,
  MemberNotFoundException,
  MemberRepository,
} from '@lib/group/domain';
import { BaseQueryHandler, CUID } from '@lib/shared';
import { QueryHandler } from '@nestjs/cqrs';

import { GetMemberByUserIdQuery } from './get-member-by-user-id.query';

@QueryHandler(GetMemberByUserIdQuery)
export class GetMemberByUserIdQueryHandler extends BaseQueryHandler<
  GetMemberByUserIdQuery,
  Member
> {
  constructor(private readonly _memberRepository: MemberRepository) {
    super();
  }

  protected async handle(query: GetMemberByUserIdQuery): Promise<Member> {
    const userId = new CUID(query.userId);
    const groupId = new CUID(query.groupId);
    const member = await this._memberRepository.findOne({
      userId,
      groupId,
    });
    if (!member) {
      throw new MemberNotFoundException();
    }
    return member;
  }
}
