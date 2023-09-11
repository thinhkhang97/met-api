import {
  EstimationMeetingStatus,
  MeetingStatus,
} from '@lib/meeting/domain/constance';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(EstimationMeetingStatus, { name: 'EstimationMeetingStatus' });
registerEnumType(MeetingStatus, { name: 'MeetingStatus' });
