import { Test, TestingModule } from '@nestjs/testing';

import { GraphqlGatewayController } from './graphql-gateway.controller';
import { GraphqlGatewayService } from './graphql-gateway.service';

describe('GraphqlGatewayController', () => {
  let graphqlGatewayController: GraphqlGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GraphqlGatewayController],
      providers: [GraphqlGatewayService],
    }).compile();

    graphqlGatewayController = app.get<GraphqlGatewayController>(
      GraphqlGatewayController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(graphqlGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
