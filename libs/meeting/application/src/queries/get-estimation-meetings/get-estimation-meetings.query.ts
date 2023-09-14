import { BaseQuery, QueryProps } from '@lib/shared';

export class GetEstimationMeetingsQuery extends BaseQuery {
  public groupId: string;

  constructor(props: QueryProps<GetEstimationMeetingsQuery>) {
    super();
    this.groupId = props.groupId;
  }
}
