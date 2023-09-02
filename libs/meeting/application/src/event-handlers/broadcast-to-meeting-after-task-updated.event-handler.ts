import { MeetingChannel, MeetingEventName } from '@lib/meeting/application';
import { TaskEstimationUpdatedEvent } from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(TaskEstimationUpdatedEvent)
export class BroadcastToMeetingAfterTaskUpdatedEventHandler extends BaseEventHandler<TaskEstimationUpdatedEvent> {
  constructor(private readonly _ioredisService: IoredisService) {
    super();
  }

  protected async execute(event: TaskEstimationUpdatedEvent) {
    await this._ioredisService.publish(
      MeetingChannel.ESTIMATION_MEETING,
      JSON.stringify({
        eventName: MeetingEventName.ESTIMATION_TASK_UPDATED,
        payload: {
          meetingId: event.aggregateId.unpack(),
          taskEstimationId: event.taskEstimationId.unpack(),
          title: event.title.unpack(),
          description: event.description,
        },
      }),
    );
  }
}
