import {
  MeetingMemberNotFoundException,
  MemberJoinedEvent,
} from '@lib/meeting/domain';
import { BaseEventHandler } from '@lib/shared';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(MemberJoinedEvent)
export class BroadcastToMeetingAfterMemberJoinedEventHandler extends BaseEventHandler<MemberJoinedEvent> {
  protected execute(event: MemberJoinedEvent) {
    console.log(event);
    throw new MeetingMemberNotFoundException();
  }
}
