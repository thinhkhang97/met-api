import { GetEstimationMeetingQuery } from '@lib/meeting/application';
import { EstimationMeeting } from '@lib/meeting/domain';
import { EstimationMeetingObject } from '@lib/meeting/graphql-ui/objects';
import { Either } from '@lib/shared';
import { QueryBus } from '@nestjs/cqrs';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';

import { EstimationMeetingResultUnion } from '../unions';

@Resolver()
export class EstimationMeetingQuery {
  constructor(private readonly _queryBus: QueryBus) {}

  @Query(() => EstimationMeetingResultUnion)
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
}
