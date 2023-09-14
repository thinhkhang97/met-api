import { GetMemberQuery } from '@lib/group/application/queries/get-member/get-member.query';
import {
  Member,
  MemberNotFoundException,
  MemberRepository,
} from '@lib/group/domain';
import { BaseQueryHandler, CUID } from '@lib/shared';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetMemberQuery)
export class GetMemberQueryHandler extends BaseQueryHandler<
  GetMemberQuery,
  Member
> {
  constructor(private readonly _memberRepository: MemberRepository) {
    super();
  }

  protected async handle(query: GetMemberQuery): Promise<Member> {
    const memberId = new CUID(query.memberId);
    const groupId = new CUID(query.groupId);
    const member = await this._memberRepository.findOne({
      id: memberId,
      groupId,
    });
    if (!member) {
      throw new MemberNotFoundException();
    }
    return member;
  }
}
