import { InternalAuthGuard } from '@lib/shared';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { InternalService } from '../services';

@Controller('internal')
@UseGuards(InternalAuthGuard)
export class InternalController {
  constructor(private readonly _identityService: InternalService) {}

  @Get('user')
  public async getUserById(@Query() query) {
    return await this._identityService.getUserById(query.id);
  }
}
