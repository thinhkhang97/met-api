import { TaskEstimation } from '@prisma/meeting-client';

import { MemberEstimationOrmEntity } from './member-estimation.orm-entity';

export interface TaskEstimationOrmEntity extends TaskEstimation {
  memberEstimations: MemberEstimationOrmEntity[];
}
