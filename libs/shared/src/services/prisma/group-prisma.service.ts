import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/group-client';

export class GroupPrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit(): any {
    this.$connect();
  }
}
