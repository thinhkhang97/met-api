import { BaseQuery, QueryProps } from '@lib/shared';

export class GetMembersQuery extends BaseQuery {
  public readonly groupId: string;
  public readonly userId: string;

  constructor(props: QueryProps<GetMembersQuery>) {
    super();
    this.groupId = props.groupId;
    this.userId = props.userId;
  }
}
