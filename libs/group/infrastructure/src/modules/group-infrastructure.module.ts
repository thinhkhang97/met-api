import { SharedModule } from '@lib/shared/modules/shared.module';
import { Module } from '@nestjs/common';

import { ormMappers } from '../orm-mappers';
import { repositories } from '../repositories';

@Module({
  imports: [SharedModule],
  providers: [...ormMappers, ...repositories],
  exports: [...repositories],
})
export class GroupInfrastructureModule {}
