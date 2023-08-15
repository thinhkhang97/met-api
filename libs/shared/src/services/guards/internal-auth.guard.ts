import { UnauthorizedException } from '@lib/shared/exceptions';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InternalAuthGuard implements CanActivate {
  constructor(private readonly _configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const xAPIKey = request.headers['x-internal-api-key'];
    if (this._configService.getOrThrow('INTERNAL_API_KEY') !== xAPIKey) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
