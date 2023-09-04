import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { MeetingRmqController } from '../controllers';
import { TaskEstimationService } from '../services';

@Module({
  imports: [CqrsModule],
  controllers: [MeetingRmqController],
  providers: [TaskEstimationService],
})
export class MeetingRmqUiModule {}
