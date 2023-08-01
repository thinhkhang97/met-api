import { Injectable } from '@nestjs/common';

@Injectable()
export class GraphqlGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
