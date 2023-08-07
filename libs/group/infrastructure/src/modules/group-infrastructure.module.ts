import { GroupPrismaService } from '@lib/shared';
import { Module } from '@nestjs/common';

import { ormMappers } from '../orm-mappers';
import { repositories } from '../repositories';
import { services } from '../services';

@Module({
  providers: [GroupPrismaService, ...ormMappers, ...repositories, ...services],
  exports: [...repositories, ...services],
})
export class GroupInfrastructureModule {}
