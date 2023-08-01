import { GroupGraphqlUIModule } from '@lib/group/graphql-ui';
import { Module } from '@nestjs/common';

@Module({
  imports: [GroupGraphqlUIModule],
})
export class GroupModule {}
