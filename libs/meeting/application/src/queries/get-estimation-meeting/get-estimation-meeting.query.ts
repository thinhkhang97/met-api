import { BaseQuery, QueryProps } from '@lib/shared';

export class GetEstimationMeetingQuery extends BaseQuery {
  public readonly meetingId: string;

  constructor(props: QueryProps<GetEstimationMeetingQuery>) {
    super();
    this.meetingId = props.meetingId;
  }
}
