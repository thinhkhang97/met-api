import { BaseQuery, QueryProps } from '@lib/shared';

export class GetMemberQuery extends BaseQuery {
  public readonly memberId: string;

  constructor(props: QueryProps<GetMemberQuery>) {
    super();
    this.memberId = props.memberId;
  }
}
