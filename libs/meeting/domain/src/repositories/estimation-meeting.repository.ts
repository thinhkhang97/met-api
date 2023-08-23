import { EstimationMeeting, EstimationMeetingProps } from '@lib/meeting/domain';
import { BaseRepositoryPort } from '@lib/shared';

export abstract class EstimationMeetingRepository extends BaseRepositoryPort<
  EstimationMeeting,
  EstimationMeetingProps
> {}
