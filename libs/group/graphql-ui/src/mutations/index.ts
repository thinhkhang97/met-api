import { Provider } from '@nestjs/common';

import { AddMemberMutation } from './add-member.mutation';
import { CreateGroupMutation } from './create-group.mutation';
import { RemoveMemberMutation } from './remove-member.mutation';

export const mutations: Provider[] = [
  CreateGroupMutation,
  AddMemberMutation,
  RemoveMemberMutation,
];
