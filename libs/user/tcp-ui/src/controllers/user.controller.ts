import { Logger } from '@lib/shared';
import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern } from '@nestjs/microservices';

import { AuthenticateDto } from '../dtos';

@Controller()
export class UserController {
  private readonly _logger = new Logger(this.constructor.name);
  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
  ) {}

  @MessagePattern({ action: 'authenticate' })
  async authenticate({ token, internalApiKey }: AuthenticateDto) {
    if (
      internalApiKey !==
      this._configService.getOrThrow<string>('INTERNAL_API_KEY')
    ) {
      return null;
    }
    try {
      this._logger.log('AUTHENTICATE: ' + token);
      return this._jwtService.verifyAsync(token, {
        secret: this._configService.getOrThrow<string>('JWT_KEY'),
      });
    } catch (e) {
      this._logger.error(JSON.stringify(e));
      return null;
    }
  }
}
