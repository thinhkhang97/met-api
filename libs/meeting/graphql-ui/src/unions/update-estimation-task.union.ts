import {
  MeetingErrorObject,
  TaskEstimationObject,
} from '@lib/meeting/graphql-ui/objects';
import { createUnionType } from '@nestjs/graphql';

export const UpdateEstimationTaskResult = createUnionType({
  name: 'UpdateEstimationTaskResult',
  types: () => [TaskEstimationObject, MeetingErrorObject],
  resolveType: (value) => {
    if ('errorMessage' in value) {
      return MeetingErrorObject;
    }
    return TaskEstimationObject;
  },
});
