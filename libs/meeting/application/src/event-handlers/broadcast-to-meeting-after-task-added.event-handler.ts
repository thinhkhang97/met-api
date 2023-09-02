import { MeetingChannel, MeetingEventName } from '@lib/meeting/application';
import { TaskEstimationAddedEvent } from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(TaskEstimationAddedEvent)
export class BroadcastToMeetingAfterTaskAddedEventHandler extends BaseEventHandler<TaskEstimationAddedEvent> {
  constructor(private readonly _ioredisService: IoredisService) {
    super();
  }

  protected async execute(event: TaskEstimationAddedEvent) {
    await this._ioredisService.publish(
      MeetingChannel.ESTIMATION_MEETING,
      JSON.stringify({
        eventName: MeetingEventName.ESTIMATION_TASK_ADDED,
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
