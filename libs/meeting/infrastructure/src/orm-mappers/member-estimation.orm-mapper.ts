import { MemberEstimation, MemberEstimationProps } from '@lib/meeting/domain';
import { BaseOrmEntity, BaseOrmMapper, CUID } from '@lib/shared';
import { Injectable } from '@nestjs/common';

import { MemberEstimationOrmEntity } from '../orm-entities';

@Injectable()
export class MemberEstimationOrmMapper extends BaseOrmMapper<
  MemberEstimation,
  MemberEstimationProps,
  MemberEstimationOrmEntity
> {
  constructor() {
    super(MemberEstimation);
  }

  protected toEntityProps(
    ormEntity: MemberEstimationOrmEntity,
  ): MemberEstimationProps {
    return {
      meetingMemberId: new CUID(ormEntity.meetingMemberId),
      estimation: ormEntity.estimation,
      taskEstimationId: new CUID(ormEntity.taskEstimationId),
      reason: ormEntity.reason,
    };
  }

  protected toOrmProps(
    entity: MemberEstimation,
  ): Omit<MemberEstimationOrmEntity, keyof BaseOrmEntity> {
    const props = entity.getProps();
    return {
      meetingMemberId: props.meetingMemberId.unpack(),
      estimation: props.estimation,
      taskEstimationId: props.taskEstimationId.unpack(),
      reason: props.reason,
    };
  }
}
