import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class VoteNotFoundException extends BaseException {
  constructor() {
    super('vote_not_found', { status: HttpStatus.NOT_FOUND });
  }
}
