import { MeetingChannel, MeetingEventName } from '@lib/meeting/application';
import { TaskEstimationRemovedEvent } from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(TaskEstimationRemovedEvent)
export class BroadcastToMeetingAfterTaskRemovedEventHandler extends BaseEventHandler<TaskEstimationRemovedEvent> {
  constructor(private readonly _ioredisService: IoredisService) {
    super();
  }

  protected async execute(event: TaskEstimationRemovedEvent) {
    await this._ioredisService.publish(
      MeetingChannel.ESTIMATION_MEETING,
      JSON.stringify({
        eventName: MeetingEventName.ESTIMATION_TASK_REMOVED,
        payload: {
          meetingId: event.aggregateId.unpack(),
          taskEstimationId: event.taskEstimationId.unpack(),
        },
      }),
    );
  }
}
