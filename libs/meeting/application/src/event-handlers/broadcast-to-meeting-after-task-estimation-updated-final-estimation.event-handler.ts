import { MeetingChannel, MeetingEventName } from '@lib/meeting/application';
import { TaskEstimationUpdatedFinalEstimationEvent } from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(TaskEstimationUpdatedFinalEstimationEvent)
export class BroadcastToMeetingAfterTaskEstimationUpdatedFinalEstimationEventHandler extends BaseEventHandler<TaskEstimationUpdatedFinalEstimationEvent> {
  constructor(private readonly _ioredisService: IoredisService) {
    super();
  }

  protected async execute(event: TaskEstimationUpdatedFinalEstimationEvent) {
    await this._ioredisService.publish(
      MeetingChannel.ESTIMATION_MEETING,
      JSON.stringify({
        eventName: MeetingEventName.ESTIMATION_TASK_UPDATED_FINAL_VALUE,
        payload: {
          meetingId: event.aggregateId.unpack(),
          taskEstimationId: event.taskEstimationId.unpack(),
          finalEstimation: event.finalEstimation,
        },
      }),
    );
  }
}
