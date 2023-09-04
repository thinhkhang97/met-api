import { MEETING_QUEUE_SERVICE } from '@lib/meeting/application';
import { MemberUpdatedTaskEstimationEvent } from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';

@EventsHandler(MemberUpdatedTaskEstimationEvent)
export class UpdateTaskEstimationResultAfterMemberUpdatedEstimationEventHandler extends BaseEventHandler<MemberUpdatedTaskEstimationEvent> {
  constructor(
    @Inject(MEETING_QUEUE_SERVICE)
    private readonly _meetingQueueService: ClientProxy,
  ) {
    super();
  }

  protected async execute(event: MemberUpdatedTaskEstimationEvent) {
    await this._meetingQueueService.emit(
      'member_updated_estimation',
      event.aggregateId.unpack(),
    );
  }
}
