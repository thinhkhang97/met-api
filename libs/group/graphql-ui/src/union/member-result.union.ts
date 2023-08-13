import { createUnionType } from '@nestjs/graphql';

import { MemberBaseErrorObject, MemberObject } from '../objects';

export const MemberResultUnion = createUnionType({
  name: 'MemberResult',
  types: () => [MemberObject, MemberBaseErrorObject],
  resolveType: (value) => {
    if ('errorMessage' in value) {
      return MemberBaseErrorObject;
    }
    return MemberObject;
  },
});
