import { EstimationMeeting, EstimationMeetingProps } from '@lib/meeting/domain';
import { EstimationMeetingOrmEntity } from '@lib/meeting/infrastructure/orm-entities';
import { BaseOrmEntity, BaseOrmMapper, CUID } from '@lib/shared';
import { Injectable } from '@nestjs/common';

import { MemberOrmMapper } from './member.orm-mapper';
import { TaskEstimationOrmMapper } from './task-estimation.orm-mapper';

@Injectable()
export class EstimationMeetingOrmMapper extends BaseOrmMapper<
  EstimationMeeting,
  EstimationMeetingProps,
  EstimationMeetingOrmEntity
> {
  constructor(
    private readonly _memberOrmMapper: MemberOrmMapper,
    private readonly _taskEstimationOrmMapper: TaskEstimationOrmMapper,
  ) {
    super(EstimationMeeting);
  }

  protected toEntityProps(
    ormEntity: EstimationMeetingOrmEntity,
  ): EstimationMeetingProps {
    return {
      groupId: new CUID(ormEntity.groupId),
      title: ormEntity.title,
      status: ormEntity.status,
      members: ormEntity.members
        ? ormEntity.members.map((member) =>
            this._memberOrmMapper.toEntity(member),
          )
        : [],
      taskEstimations: ormEntity.taskEstimations
        ? ormEntity.taskEstimations.map((taskEstimation) =>
            this._taskEstimationOrmMapper.toEntity(taskEstimation),
          )
        : [],
    };
  }

  protected toOrmProps(
    entity: EstimationMeeting,
  ): Omit<EstimationMeetingOrmEntity, keyof BaseOrmEntity> {
    const props = entity.getProps();
    return {
      groupId: props.groupId.unpack(),
      title: props.title,
      status: props.status,
      members: props.members.map((member) =>
        this._memberOrmMapper.toOrm(member),
      ),
      taskEstimations: props.taskEstimations.map((taskEstimation) =>
        this._taskEstimationOrmMapper.toOrm(taskEstimation),
      ),
    };
  }
}
