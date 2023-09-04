import { MeetingChannel, MeetingEventName } from '@lib/meeting/application';
import { MemberUpdatedTaskEstimationEvent } from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(MemberUpdatedTaskEstimationEvent)
export class BroadcastToMeetingMemberUpdatedTaskEstimationEventHandler extends BaseEventHandler<MemberUpdatedTaskEstimationEvent> {
  constructor(private readonly _ioredisService: IoredisService) {
    super();
  }

  protected async execute(event: MemberUpdatedTaskEstimationEvent) {
    await this._ioredisService.publish(
      MeetingChannel.ESTIMATION_MEETING,
      JSON.stringify({
        eventName: MeetingEventName.MEMBER_UPDATED_TASK_ESTIMATION,
        payload: {
          taskEstimationId: event.aggregateId.unpack(),
          meetingMemberId: event.meetingMemberId.unpack(),
        },
      }),
    );
  }
}
