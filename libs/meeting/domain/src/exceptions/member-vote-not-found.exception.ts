import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class MemberVoteNotFoundException extends BaseException {
  constructor() {
    super('member_vote_not_found', { status: HttpStatus.NOT_FOUND });
  }
}
