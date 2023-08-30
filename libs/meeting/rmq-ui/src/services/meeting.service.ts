import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class MeetingService {
  constructor(private readonly _commandBus: CommandBus) {}
}
