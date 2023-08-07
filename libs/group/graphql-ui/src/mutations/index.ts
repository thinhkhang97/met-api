import { CreateGroupMutation } from '@lib/group/graphql-ui/mutations/create-group.mutation';
import { Provider } from '@nestjs/common';

export const mutations: Provider[] = [CreateGroupMutation];
