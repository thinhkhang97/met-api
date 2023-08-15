import { BaseRepositoryPort } from '@lib/shared';

import { Member, MemberProps } from '../entities';

export abstract class MemberRepository extends BaseRepositoryPort<
  Member,
  MemberProps
> {}
