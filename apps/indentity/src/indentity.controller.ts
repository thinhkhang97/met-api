import { Controller, Get } from '@nestjs/common';
import { IndentityService } from './indentity.service';

@Controller()
export class IndentityController {
  constructor(private readonly indentityService: IndentityService) {}

  @Get()
  getHello(): string {
    return this.indentityService.getHello();
  }
}
