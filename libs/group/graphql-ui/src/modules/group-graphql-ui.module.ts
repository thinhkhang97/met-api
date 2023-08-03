import { WrappedGraphqlModule } from '@lib/shared/modules/wapped-graphql/wrapped-graphql.module';
import { WrappedJwtModule } from '@lib/shared/modules/wrapped-jwt/wrapped-jwt.module';
import { Module } from '@nestjs/common';

import { queries } from '../queries';

@Module({
  imports: [
    WrappedJwtModule.registerAsync(),
    WrappedGraphqlModule.forSubgraph(),
  ],
  providers: [...queries],
})
export class GroupGraphqlUIModule {}
