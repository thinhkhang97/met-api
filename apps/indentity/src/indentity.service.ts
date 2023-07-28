import { Injectable } from '@nestjs/common';

@Injectable()
export class IndentityService {
  getHello(): string {
    return 'Hello World!';
  }
}
