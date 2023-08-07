import { GroupPrismaService } from '@lib/shared';
import { Module } from '@nestjs/common';

import { ormMappers } from '../orm-mappers';
import { repositories } from '../repositories';

@Module({
  providers: [GroupPrismaService, ...ormMappers, ...repositories],
  exports: [...repositories],
})
export class GroupInfrastructureModule {}
