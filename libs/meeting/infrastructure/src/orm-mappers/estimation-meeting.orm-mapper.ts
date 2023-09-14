import {
  EstimationMeeting,
  EstimationMeetingProps,
  MemberWatchedList,
  TaskEstimationWatchedList,
} from '@lib/meeting/domain';
import { EstimationMeetingStatus } from '@lib/meeting/domain/constance';
import { EstimationMeetingOrmEntity } from '@lib/meeting/infrastructure/orm-entities';
import { BaseOrmEntity, BaseOrmMapper, CUID, DateVO } from '@lib/shared';
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
      description: ormEntity.description,
      status: ormEntity.status as EstimationMeetingStatus,
      from: new DateVO(ormEntity.from),
      to: new DateVO(ormEntity.to),
      members: new MemberWatchedList(
        ormEntity.members
          ? ormEntity.members.map((member) =>
              this._memberOrmMapper.toEntity(member),
            )
          : [],
      ),
      taskEstimations: new TaskEstimationWatchedList(
        ormEntity.taskEstimations
          ? ormEntity.taskEstimations.map((taskEstimation) =>
              this._taskEstimationOrmMapper.toEntity(taskEstimation),
            )
          : [],
      ),
    };
  }

  protected toOrmProps(
    entity: EstimationMeeting,
  ): Omit<EstimationMeetingOrmEntity, keyof BaseOrmEntity> {
    const props = entity.getProps();
    return {
      groupId: props.groupId.unpack(),
      title: props.title,
      description: props.description,
      status: props.status,
      from: props.from.unpack(),
      to: props.to.unpack(),
      members: props.members.updatedItems.map((member) =>
        this._memberOrmMapper.toOrm(member),
      ),
      taskEstimations: props.taskEstimations.updatedItems.map(
        (taskEstimation) => this._taskEstimationOrmMapper.toOrm(taskEstimation),
      ),
    };
  }
}
