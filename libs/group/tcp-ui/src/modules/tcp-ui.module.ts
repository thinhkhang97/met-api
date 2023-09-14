import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GroupController } from '../controllers';

@Module({
  imports: [CqrsModule],
  controllers: [GroupController],
})
export class GroupTcpUiModule {}
