import { MeetingChannel, MeetingEventName } from '@lib/meeting/application';
import {
  MemberUpdatedTaskEstimationEvent,
  TaskEstimationNotFoundException,
  TaskEstimationRepository,
} from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { IoredisService } from '@lib/shared/modules/ioredis';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(MemberUpdatedTaskEstimationEvent)
export class BroadcastToMeetingMemberUpdatedTaskEstimationEventHandler extends BaseEventHandler<MemberUpdatedTaskEstimationEvent> {
  constructor(
    private readonly _ioredisService: IoredisService,
    private readonly _taskEstimationRepository: TaskEstimationRepository,
  ) {
    super();
  }

  protected async execute(event: MemberUpdatedTaskEstimationEvent) {
    const taskEstimation =
      await this._taskEstimationRepository.findOneByIdOrThrow(
        event.aggregateId,
        new TaskEstimationNotFoundException(),
      );
    const estimatedMemberIds =
      taskEstimation.memberEstimations.estimatedMembers.map((estimatedMember) =>
        estimatedMember.meetingMemberId.unpack(),
      );
    await this._ioredisService.publish(
      MeetingChannel.ESTIMATION_MEETING,
      JSON.stringify({
        eventName: MeetingEventName.MEMBER_UPDATED_TASK_ESTIMATION,
        payload: {
          meetingId: event.meetingId.unpack(),
          taskEstimationId: event.aggregateId.unpack(),
          estimatedMemberIds,
        },
      }),
    );
  }
}
