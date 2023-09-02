import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class EstimationTaskInvalidException extends BaseException {
  constructor() {
    super('estimation_task_invalid', { status: HttpStatus.BAD_REQUEST });
  }
}
