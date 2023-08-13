import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class MemberNotFoundException extends BaseException {
  constructor() {
    super('member_not_found', { status: HttpStatus.BAD_REQUEST });
  }
}
