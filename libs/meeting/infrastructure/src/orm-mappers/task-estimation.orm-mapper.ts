import { TaskEstimation, TaskEstimationProps } from '@lib/meeting/domain';
import { EstimationTaskTitle } from '@lib/meeting/domain/value-objects';
import { BaseOrmEntity, BaseOrmMapper, CUID } from '@lib/shared';
import { Injectable } from '@nestjs/common';

import { TaskEstimationOrmEntity } from '../orm-entities';
import { MemberEstimationOrmMapper } from './member-estimation.orm-mapper';

@Injectable()
export class TaskEstimationOrmMapper extends BaseOrmMapper<
  TaskEstimation,
  TaskEstimationProps,
  TaskEstimationOrmEntity
> {
  constructor(
    private readonly _memberEstimationOrmMapper: MemberEstimationOrmMapper,
  ) {
    super(TaskEstimation);
  }

  protected toEntityProps(
    ormEntity: TaskEstimationOrmEntity,
  ): TaskEstimationProps {
    return {
      meetingId: new CUID(ormEntity.meetingId),
      title: EstimationTaskTitle.create(ormEntity.title),
      description: ormEntity.description,
      status: ormEntity.status,
      averageEstimation: ormEntity.averageEstimation,
      memberEstimations: ormEntity.memberEstimations
        ? ormEntity.memberEstimations.map((memberEstimation) =>
            this._memberEstimationOrmMapper.toEntity(memberEstimation),
          )
        : [],
    };
  }

  protected toOrmProps(
    entity: TaskEstimation,
  ): Omit<TaskEstimationOrmEntity, keyof BaseOrmEntity> {
    const props = entity.getProps();
    return {
      title: props.title.unpack(),
      description: props.description,
      status: props.status,
      meetingId: props.meetingId.unpack(),
      averageEstimation: props.averageEstimation,
      memberEstimations: props.memberEstimations.map((memberEstimation) =>
        this._memberEstimationOrmMapper.toOrm(memberEstimation),
      ),
    };
  }
}
