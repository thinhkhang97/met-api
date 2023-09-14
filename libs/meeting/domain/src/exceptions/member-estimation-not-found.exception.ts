import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class MemberEstimationNotFoundException extends BaseException {
  constructor() {
    super('member_estimation_not_found', { status: HttpStatus.NOT_FOUND });
  }
}
