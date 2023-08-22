import { Member, MemberProps } from '@lib/meeting/domain';
import { BaseOrmEntity, BaseOrmMapper, CUID } from '@lib/shared';
import { Injectable } from '@nestjs/common';

import { MemberOrmEntity } from '../orm-entities';

@Injectable()
export class MemberOrmMapper extends BaseOrmMapper<
  Member,
  MemberProps,
  MemberOrmEntity
> {
  constructor() {
    super(Member);
  }

  protected toEntityProps(ormEntity: MemberOrmEntity): MemberProps {
    return {
      role: ormEntity.role,
      memberId: new CUID(ormEntity.memberId),
      name: ormEntity.name,
      meetingId: new CUID(ormEntity.meetingId),
      status: ormEntity.status,
    };
  }

  protected toOrmProps(
    entity: Member,
  ): Omit<MemberOrmEntity, keyof BaseOrmEntity> {
    const props = entity.getProps();
    return {
      role: props.role,
      memberId: props.memberId.unpack(),
      name: props.name,
      meetingId: props.meetingId.unpack(),
      status: props.status,
    };
  }
}
