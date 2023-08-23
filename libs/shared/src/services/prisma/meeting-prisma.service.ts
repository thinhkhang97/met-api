import { Logger } from '@lib/shared';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/meeting-client';

@Injectable()
export class MeetingPrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);

  async onModuleInit() {
    this.$connect();
    this.logger.log('database connected');
  }
}
