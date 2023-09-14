import { BaseRepositoryPort } from '@lib/shared';

import { TaskEstimation, TaskEstimationProps } from '../aggregates';

export abstract class TaskEstimationRepository extends BaseRepositoryPort<
  TaskEstimation,
  TaskEstimationProps
> {}
