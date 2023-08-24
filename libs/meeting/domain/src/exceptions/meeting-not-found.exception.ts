import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class MeetingNotFoundException extends BaseException {
  constructor() {
    super('meeting_not_found', { status: HttpStatus.NOT_FOUND });
  }
}
