import { IdentityHttpService } from '@lib/shared';
import { GroupPrismaService } from '@lib/shared/services/prisma/group-prisma.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ormMappers } from '../orm-mappers';
import { repositories } from '../repositories';
import { services } from '../services';

@Module({
  imports: [HttpModule.register({ timeout: 30000 })],
  providers: [
    GroupPrismaService,
    IdentityHttpService,
    ...ormMappers,
    ...repositories,
    ...services,
  ],
  exports: [...repositories, ...services],
})
export class GroupInfrastructureModule {}
