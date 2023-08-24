import { GROUP_INTERNAL_SERVICE } from '@lib/meeting/infrastructure/constance';
import { MeetingPrismaService } from '@lib/shared';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ormMappers } from '../orm-mappers';
import { repositories } from '../repositories';
import { services } from '../services';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GROUP_INTERNAL_SERVICE,
        imports: [ConfigModule.forRoot({ isGlobal: true })],
        useFactory: (_configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: _configService.getOrThrow('GROUP_MS_HOST'),
              port: _configService.getOrThrow('GROUP_MS_PORT'),
            },
          };
        },
        inject: [ConfigService],
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
