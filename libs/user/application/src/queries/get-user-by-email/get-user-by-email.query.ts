import { BaseQuery, QueryProps } from '@lib/shared';

export class GetUserByEmailQuery extends BaseQuery {
  public readonly email: string;

  constructor(props: QueryProps<GetUserByEmailQuery>) {
    super();
    this.email = props.email;
  }
}
