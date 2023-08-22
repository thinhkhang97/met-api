import { Provider } from '@nestjs/common';

import { EstimationMeetingOrmMapper } from './estimation-meeting.orm-mapper';
import { MemberOrmMapper } from './member.orm-mapper';
import { MemberEstimationOrmMapper } from './member-estimation.orm-mapper';
import { TaskEstimationOrmMapper } from './task-estimation.orm-mapper';

export * from './estimation-meeting.orm-mapper';
export * from './member.orm-mapper';
export * from './member-estimation.orm-mapper';
export * from './task-estimation.orm-mapper';

export const ormMappers: Provider[] = [
  MemberOrmMapper,
  MemberEstimationOrmMapper,
  TaskEstimationOrmMapper,
  EstimationMeetingOrmMapper,
];
