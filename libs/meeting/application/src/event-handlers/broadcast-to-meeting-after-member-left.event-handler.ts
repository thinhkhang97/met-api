import { MemberLeftEvent } from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(MemberLeftEvent)
export class BroadcastToMeetingAfterMemberLeftEventHandler extends BaseEventHandler<MemberLeftEvent> {
  constructor(private readonly _ioredisService: IoredisService) {
    super();
  }

  protected async execute(event: MemberLeftEvent) {
    const memberProps = event.member.getProps();
    await this._ioredisService.publish(
      'MEETING',
      JSON.stringify({
        eventName: 'member_left',
        payload: {
          memberId: memberProps.memberId.unpack(),
          meetingId: memberProps.meetingId.unpack(),
          name: memberProps.name,
          role: memberProps.role,
        },
      }),
    );
  }
}
