import { GroupApplicationModule } from '@lib/group/application';
import { WrappedGraphqlModule } from '@lib/shared/modules/wapped-graphql/wrapped-graphql.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { mutations } from '../mutations';
import { queries } from '../queries';

@Module({
  imports: [
    CqrsModule,
    WrappedGraphqlModule.forSubgraph(),
    GroupApplicationModule,
  ],
  providers: [...queries, ...mutations],
})
export class GroupGraphqlUIModule {}
