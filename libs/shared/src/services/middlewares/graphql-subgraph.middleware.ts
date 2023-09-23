import { NestMiddleware } from '@nestjs/common';

export class GraphqlSubgraphMiddleware implements NestMiddleware {
  use(_: Request, __: any, next: (error?: any) => void) {
    next();
  }
}
