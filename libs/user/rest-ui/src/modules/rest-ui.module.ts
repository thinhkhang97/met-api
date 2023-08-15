import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { controllers } from '../controllers';
import { InternalService } from '../services';

@Module({
  imports: [CqrsModule],
  providers: [InternalService],
  controllers: [...controllers],
})
export class UserRestUiModule {}
