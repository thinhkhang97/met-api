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
    const memberProps = event.member.getProps();
    await this._ioredisService.publish(
      'MEETING',
      JSON.stringify({
        eventName: 'member_joined',
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
