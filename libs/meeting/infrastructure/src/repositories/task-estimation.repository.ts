import {
  TaskEstimation,
  TaskEstimationProps,
  TaskEstimationRepository,
} from '@lib/meeting/domain';
import { TaskEstimationOrmEntity } from '@lib/meeting/infrastructure/orm-entities';
import { TaskEstimationOrmMapper } from '@lib/meeting/infrastructure/orm-mappers';
import { PrismaRepository, QueryParams } from '@lib/shared';
import { MeetingPrismaService } from '@lib/shared/services/prisma/meeting-prisma.service';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Prisma } from '@prisma/meeting-client';
import { omit } from 'lodash';

@Injectable()
export class TaskEstimationRepositoryImpl
  extends PrismaRepository<
    TaskEstimation,
    TaskEstimationProps,
    TaskEstimationOrmEntity,
    Prisma.TaskEstimationDelegate<undefined>
  >
  implements TaskEstimationRepository
{
  constructor(
    private readonly _taskEstimationOrmMapper: TaskEstimationOrmMapper,
    private readonly _meetingPrismaService: MeetingPrismaService,
    private readonly _evenPublisher: EventPublisher,
  ) {
    super(
      _meetingPrismaService.taskEstimation,
      _taskEstimationOrmMapper,
      _evenPublisher,
    );
  }

  getIncludeRelation():
    | { include: { [key in keyof TaskEstimationProps]?: boolean } }
    | undefined {
    return {
      include: {
        memberEstimations: true,
      },
    };
  }

  protected getWhereCondition(
    props: QueryParams<TaskEstimationProps>,
  ): Prisma.TaskEstimationWhereInput {
    const whereInput: Prisma.TaskEstimationWhereInput = {};

    if (props.id) {
      whereInput.id = props.id.value;
    }

    return whereInput;
  }

  protected preUpsert(entity: TaskEstimation): Prisma.TaskEstimationUpsertArgs {
    const ormProps = this._taskEstimationOrmMapper.toOrm(entity);
    return {
      where: { id: ormProps.id },
      create: {
        ...ormProps,
        memberEstimations: {
          createMany: {
            data: (ormProps.memberEstimations || []).map((memberEstimation) =>
              omit(memberEstimation, 'taskEstimationId'),
            ),
          },
        },
      },
      update: {
        ...ormProps,
        memberEstimations: {
          upsert: (ormProps.memberEstimations || []).map(
            (memberEstimation) => ({
              where: { id: memberEstimation.id },
              create: { ...omit(memberEstimation, 'taskEstimationId') },
              update: { ...omit(memberEstimation, 'taskEstimationId') },
            }),
          ),
        },
      },
    };
  }
}
