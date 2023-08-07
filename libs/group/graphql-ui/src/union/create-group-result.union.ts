import {
  GroupBaseErrorObject,
  GroupObject,
} from '@lib/group/graphql-ui/objects';
import { createUnionType } from '@nestjs/graphql';

export const CreateGroupResult = createUnionType({
  name: 'CreateGroupResult',
  types: () => [GroupObject, GroupBaseErrorObject],
  resolveType: (value) => {
    if ('errorMessage' in value) {
      return GroupBaseErrorObject;
    }
    return GroupObject;
  },
});
