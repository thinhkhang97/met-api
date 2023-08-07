import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GroupQuery {
  @Query(() => String)
  public groupHealthCheck() {
    return 'Group queries';
  }
}
