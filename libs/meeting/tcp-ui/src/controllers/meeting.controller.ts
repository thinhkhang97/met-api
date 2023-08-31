import { LeaveMeetingCommand } from '@lib/meeting/application';
import { Either } from '@lib/shared';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';

import { MemberLeaveDto } from '../dtos';

@Controller()
export class MeetingController {
  constructor(private readonly _commandBus: CommandBus) {}

  @MessagePattern({ action: 'member-leave' })
  async onMemberLeave({ memberId, meetingId }: MemberLeaveDto) {
    const result = await this._commandBus.execute<
      LeaveMeetingCommand,
      Either<void>
    >(
      new LeaveMeetingCommand({
        meetingId,
        memberId,
      }),
    );
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return;
  }
}
