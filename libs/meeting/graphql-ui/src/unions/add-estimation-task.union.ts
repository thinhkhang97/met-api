import {
  MeetingErrorObject,
  TaskEstimationObject,
} from '@lib/meeting/graphql-ui/objects';
import { createUnionType } from '@nestjs/graphql';

export const AddEstimationTaskResult = createUnionType({
  name: 'AddEstimationTaskResult',
  types: () => [TaskEstimationObject, MeetingErrorObject],
  resolveType: (value) => {
    if ('errorMessage' in value) {
      return MeetingErrorObject;
    }
    return TaskEstimationObject;
  },
});
