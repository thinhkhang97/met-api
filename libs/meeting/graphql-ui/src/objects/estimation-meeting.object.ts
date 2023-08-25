import { MeetingObject } from '@lib/meeting/graphql-ui/objects/meeting.object';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EstimationMeetingObject extends MeetingObject {}
