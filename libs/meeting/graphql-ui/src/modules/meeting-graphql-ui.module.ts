import { MeetingApplicationModule } from '@lib/meeting/application';
import { WrappedGraphqlModule } from '@lib/shared/modules/wapped-graphql/wrapped-graphql.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { mutations } from '../mutations';
import { queries } from '../queries';

@Module({
  imports: [
    CqrsModule,
    WrappedGraphqlModule.forSubgraph(),
    MeetingApplicationModule,
  ],
  providers: [...mutations, ...queries],
})
export class MeetingGraphqlUiModule {}
