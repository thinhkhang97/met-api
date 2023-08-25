import { EstimationMeeting } from '@lib/meeting/domain';

import { MeetingService } from './meeting.service';

export abstract class EstimationMeetingService extends MeetingService<EstimationMeeting> {}
