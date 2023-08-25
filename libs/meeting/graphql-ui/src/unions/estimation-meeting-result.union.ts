import { createUnionType } from '@nestjs/graphql';

import { EstimationMeetingObject, MeetingErrorObject } from '../objects';

export const EstimationMeetingResultUnion = createUnionType({
  name: 'EstimationMeetingResult',
  types: () => [EstimationMeetingObject, MeetingErrorObject],
  resolveType: (value) => {
    if ('errorMessage' in value) {
      return MeetingErrorObject;
    }
    return EstimationMeetingObject;
  },
});
