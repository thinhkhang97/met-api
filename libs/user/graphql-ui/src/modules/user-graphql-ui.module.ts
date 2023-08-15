import { WrappedGraphqlModule } from '@lib/shared/modules/wapped-graphql/wrapped-graphql.module';
import { WrappedJwtModule } from '@lib/shared/modules/wrapped-jwt/wrapped-jwt.module';
import { UserApplicationModule } from '@lib/user/application';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { mutations } from '../mutations';
import { queries } from '../queries';

@Module({
  imports: [
    CqrsModule,
    WrappedJwtModule.registerAsync(),
    UserApplicationModule,
    WrappedGraphqlModule.forSubgraph(),
  ],
  providers: [...queries, ...mutations],
  exports: [...queries, ...mutations],
})
export class UserGraphqlUiModule {}
