import { Test, TestingModule } from '@nestjs/testing';
import { IndentityController } from './indentity.controller';
import { IndentityService } from './indentity.service';

describe('IndentityController', () => {
  let indentityController: IndentityController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IndentityController],
      providers: [IndentityService],
    }).compile();

    indentityController = app.get<IndentityController>(IndentityController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(indentityController.getHello()).toBe('Hello World!');
    });
  });
});
