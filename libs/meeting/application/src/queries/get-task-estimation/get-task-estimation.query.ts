import { BaseQuery, QueryProps } from '@lib/shared';

export class GetTaskEstimationQuery extends BaseQuery {
  public taskEstimationId: string;

  constructor(props: QueryProps<GetTaskEstimationQuery>) {
    super();
    this.taskEstimationId = props.taskEstimationId;
  }
}
