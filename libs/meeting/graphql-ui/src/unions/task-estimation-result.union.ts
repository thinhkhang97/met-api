import {
  MeetingErrorObject,
  TaskEstimationObject,
} from '@lib/meeting/graphql-ui/objects';
import { createUnionType } from '@nestjs/graphql';

export const TaskEstimationResultUnion = createUnionType({
  name: 'TaskEstimationResult',
  types: () => [TaskEstimationObject, MeetingErrorObject],
  resolveType: (value) => {
    if ('errorMessage' in value) {
      return MeetingErrorObject;
    }
    return TaskEstimationObject;
  },
});
