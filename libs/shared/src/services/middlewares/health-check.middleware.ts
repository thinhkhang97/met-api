import { NestMiddleware } from '@nestjs/common';

export class HealthCheck implements NestMiddleware {
  use(_: any, res: any, next: (error?: any) => void) {
    res.status(200).send('OK');
    next();
  }
}
