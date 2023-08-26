import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

export interface LoggedUser {
  id: string;
  email: string;
}

@Injectable()
export class JwtAuthorizationMiddleware implements NestMiddleware {
  private static readonly operationsWhiteList = ['login', 'register'];
  private static readonly X_API_KEY = 'x-api-key';

  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (this.shouldByPassValidation(req)) {
      next();
      return;
    }
    this.validateAPIKey(req);
    await this.authenticate(req);
    next();
  }

  private validateAPIKey(req: Request) {
    if (
      req.headers[JwtAuthorizationMiddleware.X_API_KEY] !==
      this._configService.getOrThrow('API_KEY')
    ) {
      throw new UnauthorizedException();
    }
  }

  private shouldByPassValidation(req: Request) {
    const env = this._configService.getOrThrow<string>('ENV');
    const operationName = req.body.operationName;
    return (
      (env === 'dev' &&
        (!operationName || operationName === 'IntrospectionQuery')) ||
      JwtAuthorizationMiddleware.operationsWhiteList.includes(operationName)
    );
  }

  private async authenticate(req: Request) {
    const [_, token] = req.headers.authorization?.split(' ') || [];
    try {
      req['user'] = await this._jwtService.verifyAsync(token, {
        secret: this._configService.getOrThrow<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
