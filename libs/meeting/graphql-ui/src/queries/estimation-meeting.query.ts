import { GetEstimationMeetingQuery } from '@lib/meeting/application';
import { GetEstimationMeetingsQuery } from '@lib/meeting/application/queries/get-estimation-meetings/get-estimation-meetings.query';
import { EstimationMeeting } from '@lib/meeting/domain';
import { EstimationMeetingObject } from '@lib/meeting/graphql-ui/objects';
import { Either } from '@lib/shared';
import { QueryBus } from '@nestjs/cqrs';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';

import { EstimationMeetingResultUnion } from '../unions';

@Resolver()
export class EstimationMeetingQuery {
  constructor(private readonly _queryBus: QueryBus) {}

  @Query(() => EstimationMeetingResultUnion, { name: 'meeting' })
  public async getMeetingById(
    @Args({ type: () => ID, name: 'meetingId' }) meetingId: string,
  ) {
    const result = await this._queryBus.execute<
      GetEstimationMeetingQuery,
      Either<EstimationMeeting>
    >(new GetEstimationMeetingQuery({ meetingId }));
    if (result.isErr()) {
      return {
        errorMessage: result.unwrapErr().message,
      };
    }
    return new EstimationMeetingObject(result.unwrap());
  }

  @Query(() => [EstimationMeetingObject], { name: 'meetings' })
  public async getMeetings(
    @Args({ type: () => ID, name: 'groupId' }) groupId: string,
  ) {
    const result = await this._queryBus.execute<
      GetEstimationMeetingsQuery,
      Either<EstimationMeeting[]>
    >(new GetEstimationMeetingsQuery({ groupId }));
    if (result.isErr()) {
      return [];
    }
    return result
      .unwrap()
      .map((meeting) => new EstimationMeetingObject(meeting));
  }
}
