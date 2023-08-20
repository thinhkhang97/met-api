import {
  GroupBaseErrorObject,
  MemberObject,
} from '@lib/group/graphql-ui/objects';
import { createUnionType } from '@nestjs/graphql';

export const AddMemberResultUnion = createUnionType({
  name: 'AddMemberResult',
  types: () => [MemberObject, GroupBaseErrorObject],
  resolveType: (value) => {
    if ('errorMessage' in value) {
      return GroupBaseErrorObject;
    }
    return MemberObject;
  },
});
