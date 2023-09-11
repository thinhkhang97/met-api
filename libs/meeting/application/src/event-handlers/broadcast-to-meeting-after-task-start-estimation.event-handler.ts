import { MeetingChannel, MeetingEventName } from '@lib/meeting/application';
import { TaskEstimationStartedEvent } from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(TaskEstimationStartedEvent)
export class BroadcastToMeetingAfterTaskStartEstimationEventHandler extends BaseEventHandler<TaskEstimationStartedEvent> {
  constructor(private readonly _ioredisService: IoredisService) {
    super();
  }

  protected async execute(event: TaskEstimationStartedEvent) {
    await this._ioredisService.publish(
      MeetingChannel.ESTIMATION_MEETING,
      JSON.stringify({
        eventName: MeetingEventName.ESTIMATION_TASK_STARTED,
        payload: {
          meetingId: event.aggregateId.unpack(),
          taskEstimationId: event.taskEstimationId.unpack(),
        },
      }),
    );
  }
}
