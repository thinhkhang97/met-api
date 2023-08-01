import { WrappedJwtModule } from '@lib/shared/modules/wrapped-jwt/wrapped-jwt.module';
import { commands } from '@lib/user/application/commands';
import { queries } from '@lib/user/application/queries';
import { UserInfrastructureModule } from '@lib/user/infrastructure/modules/user-infrastructure.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    WrappedJwtModule.registerAsync(),
    UserInfrastructureModule,
  ],
  providers: [...queries, ...commands],
  exports: [...queries, ...commands],
})
export class UserApplicationModule {}
