import { BaseQuery, QueryProps } from '@lib/shared';

export class GetGroupsQuery extends BaseQuery {
  public readonly userId: string;

  constructor(props: QueryProps<GetGroupsQuery>) {
    super();
    this.userId = props.userId;
  }
}
