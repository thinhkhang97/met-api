import { MemberJoinedEvent } from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(MemberJoinedEvent)
export class BroadcastToMeetingAfterMemberJoinedEventHandler extends BaseEventHandler<MemberJoinedEvent> {
  constructor(private readonly _ioredisService: IoredisService) {
    super();
  }

  protected async execute(event: MemberJoinedEvent) {
    await this._ioredisService.publish(
      'MEETING',
      JSON.stringify({
        memberId: event.member.memberId.unpack(),
        memberName: event.member.memberName,
      }),
    );
  }
}
