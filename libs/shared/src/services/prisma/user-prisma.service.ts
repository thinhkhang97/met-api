import { Logger } from '@lib/shared/services';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/user-client';

@Injectable()
export class UserPrismaService extends PrismaClient implements OnModuleInit {
  private readonly _logger = new Logger(this.constructor.name);

  public async onModuleInit() {
    await this.$connect();
    this._logger.log('Database connected');
  }
}
