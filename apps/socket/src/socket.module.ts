import { MeetingSocketModule } from '@lib/meeting/socket';
import { HealthCheck } from '@lib/shared';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/socket/src/.env',
    }),
    MeetingSocketModule,
  ],
})
export class SocketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HealthCheck).forRoutes('/health');
  }
}
