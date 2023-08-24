import { WrappedGraphqlModule } from '@lib/shared/modules/wapped-graphql/wrapped-graphql.module';
import { UserApplicationModule } from '@lib/user/application';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { mutations } from '../mutations';

@Module({
  imports: [
    CqrsModule,
    WrappedGraphqlModule.forSubgraph(),
    UserApplicationModule,
  ],
  providers: [...mutations],
})
export class MeetingGraphqlUiModule {}
