import { MeetingApplicationModule } from '@lib/meeting/application';
import { MeetingController } from '@lib/meeting/tcp-ui/controllers';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, MeetingApplicationModule],
  controllers: [MeetingController],
})
export class MeetingTcpUiModule {}
