import { Nullable } from '@lib/shared';
import { Meeting } from '@prisma/meeting-client';

import { MemberOrmEntity } from './member.orm-entity';
import { TaskEstimationOrmEntity } from './task-estimation.orm-entity';

export interface EstimationMeetingOrmEntity extends Meeting {
  members: Nullable<MemberOrmEntity[]>;
  taskEstimations: Nullable<TaskEstimationOrmEntity[]>;
}
