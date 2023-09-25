import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class MeetingDataNotValidException extends BaseException {
  constructor() {
    super('meeting_data_not_valid', { status: HttpStatus.BAD_REQUEST });
  }
}
