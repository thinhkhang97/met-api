import { BaseQuery, QueryProps } from '@lib/shared';

export class GetMemberByUserIdQuery extends BaseQuery {
  public readonly groupId: string;
  public readonly userId: string;

  constructor(props: QueryProps<GetMemberByUserIdQuery>) {
    super();
    this.userId = props.userId;
    this.groupId = props.groupId;
  }
}
