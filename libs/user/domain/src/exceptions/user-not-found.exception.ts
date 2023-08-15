import { BaseException } from '@lib/shared/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends BaseException {
  constructor() {
    super('user_not_found', { status: HttpStatus.NOT_FOUND });
  }
}
