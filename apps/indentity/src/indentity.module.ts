import { Module } from '@nestjs/common';
import { IndentityController } from './indentity.controller';
import { IndentityService } from './indentity.service';

@Module({
  imports: [],
  controllers: [IndentityController],
  providers: [IndentityService],
})
export class IndentityModule {}
