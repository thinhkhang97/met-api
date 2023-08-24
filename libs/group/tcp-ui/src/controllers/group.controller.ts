import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('internal')
export class GroupController {
  @MessagePattern({ action: 'get-group-by-id' })
  async getGroupById(groupId: string) {
    console.log('GROUP ID', groupId);
    return {
      id: groupId,
      name: 'Group 1',
    };
  }
}
