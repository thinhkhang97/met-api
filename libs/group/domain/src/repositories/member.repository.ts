import { BaseRepositoryPort } from '@lib/shared';

import { Member, MemberProps } from '../entities';

export abstract class MemberRepositoryPort extends BaseRepositoryPort<
  Member,
  MemberProps
> {}
