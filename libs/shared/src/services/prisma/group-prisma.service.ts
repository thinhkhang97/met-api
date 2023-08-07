import { Logger } from '@lib/shared/services';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/group-client';

@Injectable()
export class GroupPrismaService extends PrismaClient implements OnModuleInit {
  private readonly _logger = new Logger(this.constructor.name);

  async onModuleInit() {
    await this.$connect();
    this._logger.log('Database connected');
  }
}
