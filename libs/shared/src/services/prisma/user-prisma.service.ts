import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/user-client';

@Injectable()
export class UserPrismaService extends PrismaClient implements OnModuleInit {
  public async onModuleInit() {
    await this.$connect();
  }
}
