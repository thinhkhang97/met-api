import { Provider } from '@nestjs/common';

import { AddEstimationTaskCommandHandler } from './add-estimation-task/add-estimation-task.command-handler';
import { CreateEstimationMeetingCommandHandler } from './create-estimation-meeting/create-estimation-meeting.command-handler';
import { FinishEstimateTaskCommandHandler } from './finish-estimate-task/finish-estimate-task.command-handler';
import { JoinMeetingCommandHandler } from './join-meeting/join-meeting.command-handler';
import { LeaveMeetingCommandHandler } from './leave-meeting/leave-meeting.command-handler';
import { RemoveEstimationTaskCommandHandler } from './remove-estimation-task/remove-estimation-task.command-handler';
import { StartEstimateTaskCommandHandler } from './start-estimate-task/start-estimate-task.command-handler';
import { UpdateEstimationTaskCommandHandler } from './update-estimation-task/update-estimation-task.command-handler';
import { UpdateMeetingCommandHandler } from './update-meeting/update-meeting.command-handler';
import { UpdateMemberEstimationCommandHandler } from './update-member-estimation/update-member-estimation.command-handler';
import { UpdateTaskEstimationResultCommandHandler } from './update-task-estimation-result/update-task-estimation-result.command-handler';

export * from './add-estimation-task/add-estimation-task.command';
export * from './create-estimation-meeting/create-estimation-meeting.command';
export * from './finish-estimate-task/finish-estimate-task.command';
export * from './join-meeting/join-meeting.command';
export * from './leave-meeting/leave-meeting.command';
export * from './remove-estimation-task/remove-estimation-task.command';
export * from './start-estimate-task/start-estimate-task.command';
export * from './update-estimation-task/update-estimation-task.command';
export * from './update-meeting/update-meeting.command';
export * from './update-member-estimation/update-member-estimation.command';
export * from './update-task-estimation-result/update-task-estimation-result.command';

export const commands: Provider[] = [
  CreateEstimationMeetingCommandHandler,
  JoinMeetingCommandHandler,
  LeaveMeetingCommandHandler,
  AddEstimationTaskCommandHandler,
  UpdateEstimationTaskCommandHandler,
  RemoveEstimationTaskCommandHandler,
  UpdateMemberEstimationCommandHandler,
  UpdateTaskEstimationResultCommandHandler,
  StartEstimateTaskCommandHandler,
  FinishEstimateTaskCommandHandler,
  UpdateMeetingCommandHandler,
];
