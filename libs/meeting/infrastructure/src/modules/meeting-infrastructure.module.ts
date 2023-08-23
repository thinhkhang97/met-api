import { MeetingPrismaService } from '@lib/shared';
import { Module } from '@nestjs/common';

import { ormMappers } from '../orm-mappers';
import { repositories } from '../repositories';

@Module({
  providers: [MeetingPrismaService, ...ormMappers, ...repositories],
})
export class MeetingInfrastructureModule {}
