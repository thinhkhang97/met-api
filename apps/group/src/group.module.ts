import { GroupGraphqlUIModule } from '@lib/group/graphql-ui';
import { GroupTcpUiModule } from '@lib/group/tcp-ui';
import { HealthCheck } from '@lib/shared';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/group/src/.env',
    }),
    GroupGraphqlUIModule,
    GroupTcpUiModule,
  ],
})
export class GroupModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HealthCheck);
  }
}
