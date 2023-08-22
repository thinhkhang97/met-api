import { Module } from '@nestjs/common';

import { ormMappers } from '../orm-mappers';

@Module({
  providers: [...ormMappers],
})
export class MeetingInfrastructureModule {}
