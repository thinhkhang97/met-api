import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class MeetingMemberNotFoundException extends BaseException {
  constructor() {
    super('meeting_member_not_found', { status: HttpStatus.NOT_FOUND });
  }
}
