import { EstimationMeetingObject } from '@lib/meeting/graphql-ui/objects';
import { createUnionType } from '@nestjs/graphql';

import { MeetingErrorObject } from '../objects';

export const CreateEstimationMeetingResultUnion = createUnionType({
  name: 'CreateEstimationMeetingResult',
  types: () => [EstimationMeetingObject, MeetingErrorObject],
  resolveType: (value) => {
    if ('errorMessage' in value) {
      return MeetingErrorObject;
    }
    return EstimationMeetingObject;
  },
});
