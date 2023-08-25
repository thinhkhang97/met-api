import { EstimationMeeting } from '@lib/meeting/domain';
import { ObjectType } from '@nestjs/graphql';

import { MeetingObject } from './meeting.object';

@ObjectType()
export class EstimationMeetingObject extends MeetingObject {
  constructor(entity: EstimationMeeting) {
    super(entity);
  }
}
