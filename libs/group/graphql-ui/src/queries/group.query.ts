import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GroupQuery {
  @Query(() => String, { name: 'group_health_check' })
  public getHelloWorld() {
    return 'Group queries';
  }
}
