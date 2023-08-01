import { Public } from '@lib/shared';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GroupQuery {
  @Public()
  @Query(() => String, { name: 'group_health_check' })
  public getHelloWorld() {
    return 'Group queries';
  }
}
