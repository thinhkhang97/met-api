import { BaseRepositoryPort } from '@lib/shared';

import { EstimationMeeting, EstimationMeetingProps } from '../aggregates';

export abstract class EstimationMeetingRepository extends BaseRepositoryPort<
  EstimationMeeting,
  EstimationMeetingProps
> {}
