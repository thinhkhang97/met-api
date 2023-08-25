import {
  EstimationMeeting,
  EstimationMeetingRepository,
  MeetingNotFoundException,
} from '@lib/meeting/domain';
import { BaseQueryHandler, CUID } from '@lib/shared';
import { QueryHandler } from '@nestjs/cqrs';

import { GetEstimationMeetingQuery } from './get-estimation-meeting.query';

@QueryHandler(GetEstimationMeetingQuery)
export class GetEstimationMeetingQueryHandler extends BaseQueryHandler<
  GetEstimationMeetingQuery,
  EstimationMeeting
> {
  constructor(
    private readonly _estimationMeetingRepository: EstimationMeetingRepository,
  ) {
    super();
  }

  protected async handle(
    query: GetEstimationMeetingQuery,
  ): Promise<EstimationMeeting> {
    return await this._estimationMeetingRepository.findOneByIdOrThrow(
      new CUID(query.meetingId),
      new MeetingNotFoundException(),
    );
  }
}
