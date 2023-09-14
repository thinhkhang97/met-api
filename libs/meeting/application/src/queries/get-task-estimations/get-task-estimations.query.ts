import { BaseQuery, QueryProps } from '@lib/shared';

export class GetTaskEstimationsQuery extends BaseQuery {
  public meetingId: string;

  constructor(props: QueryProps<GetTaskEstimationsQuery>) {
    super();
    this.meetingId = props.meetingId;
  }
}
