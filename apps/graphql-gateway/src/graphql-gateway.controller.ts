import { Controller, Get } from '@nestjs/common';

import { GraphqlGatewayService } from './graphql-gateway.service';

@Controller()
export class GraphqlGatewayController {
  constructor(private readonly graphqlGatewayService: GraphqlGatewayService) {}

  @Get()
  getHello(): string {
    return this.graphqlGatewayService.getHello();
  }
}
