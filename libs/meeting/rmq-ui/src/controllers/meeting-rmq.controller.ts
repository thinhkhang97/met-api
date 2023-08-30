import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MeetingService } from '../services';

@Controller()
export class MeetingRmqController {
  constructor(private readonly _meetingService: MeetingService) {}

  @MessagePattern('meeting:leave')
  handleMemberLeave(@Payload() data: { userId: string; meetingId: string }) {}
}
