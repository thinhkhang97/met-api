import { AuthGuard } from '@lib/shared';
import { WrappedGraphqlModule } from '@lib/shared/modules/wapped-graphql/wrapped-graphql.module';
import { WrappedJwtModule } from '@lib/shared/modules/wrapped-jwt/wrapped-jwt.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { queries } from '../queries';

@Module({
  imports: [
    WrappedJwtModule.registerAsync(),
    WrappedGraphqlModule.forSubgraph(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ...queries,
  ],
})
export class GroupGraphqlUIModule {}
