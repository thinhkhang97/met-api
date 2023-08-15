import { GroupInfrastructureModule } from '@lib/group/infrastructure/modules/group-infrastructure.module';
import { Module } from '@nestjs/common';

import { commands } from '../commands';
import { queries } from '../queries';

@Module({
  imports: [GroupInfrastructureModule],
  providers: [...commands, ...queries],
})
export class GroupApplicationModule {}
