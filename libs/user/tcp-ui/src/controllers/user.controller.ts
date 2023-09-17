import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern } from '@nestjs/microservices';

import { AuthenticateDto } from '../dtos';

@Controller()
export class UserController {
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
      return this._jwtService.verifyAsync(token, {
        secret: this._configService.getOrThrow<string>('JWT_KEY'),
      });
    } catch {
      return null;
    }
  }
}
