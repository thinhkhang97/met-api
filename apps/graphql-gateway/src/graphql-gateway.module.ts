import { Module } from '@nestjs/common';

import { GraphqlGatewayController } from './graphql-gateway.controller';
import { GraphqlGatewayService } from './graphql-gateway.service';

@Module({
  imports: [],
  controllers: [GraphqlGatewayController],
  providers: [GraphqlGatewayService],
})
export class GraphqlGatewayModule {}
