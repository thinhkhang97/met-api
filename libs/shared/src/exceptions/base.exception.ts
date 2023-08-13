import { HttpStatus } from '@nestjs/common';

type MetaData = {
  status: HttpStatus;
};

export abstract class BaseException extends Error {
  constructor(message: string, protected readonly metadata?: MetaData) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  public getStatus() {
    return this.metadata?.status;
  }
}
