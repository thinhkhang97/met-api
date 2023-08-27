import { WrappedJwtModule } from '@lib/shared/modules/wrapped-jwt/wrapped-jwt.module';
import { Module } from '@nestjs/common';

import { UserController } from '../controllers';

@Module({
  imports: [WrappedJwtModule.registerAsync()],
  controllers: [UserController],
})
export class UserTcpUiModule {}
