import { Meeting } from '@prisma/meeting-client';

import { MemberOrmEntity } from './member.orm-entity';
import { TaskEstimationOrmEntity } from './task-estimation.orm-entity';

export interface MeetingOrmEntity extends Meeting {
  members: MemberOrmEntity[];
  taskEstimations: TaskEstimationOrmEntity[];
}
