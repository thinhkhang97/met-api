import { UserPrismaService } from '@lib/shared';
import { UserOrmMapper } from '@lib/user/infrastructure/orm-mappers';
import { Module, Provider } from '@nestjs/common';

import { repositories } from '../repositories';

const ormMappers: Provider[] = [UserOrmMapper];

@Module({
  providers: [UserPrismaService, ...ormMappers, ...repositories],
  exports: [...repositories],
})
export class UserInfrastructureModule {}
