import { BaseException } from '@lib/shared';
import { HttpStatus } from '@nestjs/common';

export class TaskEstimationNotFoundException extends BaseException {
  constructor() {
    super('task_estimation_not_found', { status: HttpStatus.NOT_FOUND });
  }
}
