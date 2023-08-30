import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { MeetingRmqController } from '../controllers';
import { MeetingService } from '../services';

@Module({
  imports: [CqrsModule],
  controllers: [MeetingRmqController],
  providers: [MeetingService],
})
export class MeetingRmqUiModule {}
