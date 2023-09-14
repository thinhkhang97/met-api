import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class GroupNotFoundException extends BaseException {
  constructor() {
    super('group_not_found', { status: HttpStatus.NOT_FOUND });
  }
}
