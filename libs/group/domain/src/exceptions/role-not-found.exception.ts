import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class RoleNotFoundException extends BaseException {
  constructor() {
    super('role_not_found', { status: HttpStatus.BAD_REQUEST });
  }
}
