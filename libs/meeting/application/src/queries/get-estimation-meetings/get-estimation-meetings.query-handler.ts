import {
  EstimationMeeting,
  EstimationMeetingRepository,
} from '@lib/meeting/domain';
import { BaseQueryHandler, CUID } from '@lib/shared';
import { QueryHandler } from '@nestjs/cqrs';

import { GetEstimationMeetingsQuery } from './get-estimation-meetings.query';

@QueryHandler(GetEstimationMeetingsQuery)
export class GetEstimationMeetingsQueryHandler extends BaseQueryHandler<
  GetEstimationMeetingsQuery,
  EstimationMeeting[]
> {
  constructor(
    private readonly _estimationMeetingRepository: EstimationMeetingRepository,
  ) {
    super();
  }

  protected async handle(
    query: GetEstimationMeetingsQuery,
  ): Promise<EstimationMeeting[]> {
    return this._estimationMeetingRepository.findMany({
      groupId: new CUID(query.groupId),
    });
  }
}
