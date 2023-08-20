import { BaseQuery, QueryProps } from '@lib/shared';

export class GetGroupQuery extends BaseQuery {
  public readonly groupId: string;
  public readonly userId: string;

  constructor(props: QueryProps<GetGroupQuery>) {
    super();
    this.groupId = props.groupId;
    this.userId = props.userId;
  }
}
