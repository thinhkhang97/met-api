import { Module } from '@nestjs/common';

import { ormMappers } from '../orm-mappers';
import { repositories } from '../repositories';

@Module({
  providers: [...ormMappers, ...repositories],
})
export class MeetingInfrastructureModule {}
