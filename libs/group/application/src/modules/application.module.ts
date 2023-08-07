import { GroupInfrastructureModule } from '@lib/group/infrastructure/modules/group-infrastructure.module';
import { Module } from '@nestjs/common';

import { commands } from '../commands';

@Module({
  imports: [GroupInfrastructureModule],
  providers: [...commands],
})
export class GroupApplicationModule {}
