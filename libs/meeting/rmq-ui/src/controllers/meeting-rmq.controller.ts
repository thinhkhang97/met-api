import { TaskEstimationService } from '@lib/meeting/rmq-ui/services';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MeetingRmqController {
  constructor(private readonly _taskEstimationService: TaskEstimationService) {}

  @MessagePattern('member_updated_estimation')
  async handleMemberUpdatedEstimation(taskEstimationId: string) {
    await this._taskEstimationService.updateTaskEstimation(taskEstimationId);
  }
}
