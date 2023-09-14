import { MeetingChannel, MeetingEventName } from '@lib/meeting/application';
import { TaskEstimationFinishedEvent } from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(TaskEstimationFinishedEvent)
export class BroadcastToMeetingAfterTaskFinishedEstimationEventHandler extends BaseEventHandler<TaskEstimationFinishedEvent> {
  constructor(private readonly _ioredisService: IoredisService) {
    super();
  }

  protected async execute(event: TaskEstimationFinishedEvent) {
    await this._ioredisService.publish(
      MeetingChannel.ESTIMATION_MEETING,
      JSON.stringify({
        eventName: MeetingEventName.ESTIMATION_TASK_FINISHED,
        payload: {
          meetingId: event.aggregateId.unpack(),
          taskEstimationId: event.taskEstimationId.unpack(),
        },
      }),
    );
  }
}
