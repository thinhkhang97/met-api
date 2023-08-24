import { GROUP_INTERNAL_SERVICE } from '@lib/meeting/infrastructure/constance';
import { MeetingPrismaService } from '@lib/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ormMappers } from '../orm-mappers';
import { repositories } from '../repositories';
import { services } from '../services';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GROUP_INTERNAL_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3012,
        },
      },
    ]),
  ],
  providers: [
    MeetingPrismaService,
    ...ormMappers,
    ...repositories,
    ...services,
  ],
  exports: [...repositories, ...services],
})
export class MeetingInfrastructureModule {}
