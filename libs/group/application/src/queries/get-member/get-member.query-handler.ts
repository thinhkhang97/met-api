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
    const member = await this._memberRepository.findOneByIdOrThrow(
      memberId,
      new MemberNotFoundException(),
    );
    if (!member) {
      throw new MemberNotFoundException();
    }
    return member;
  }
}
