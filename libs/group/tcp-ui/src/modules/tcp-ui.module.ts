import { Module } from '@nestjs/common';

import { GroupController } from '../controllers';

@Module({
  controllers: [GroupController],
})
export class GroupTcpUiModule {}
