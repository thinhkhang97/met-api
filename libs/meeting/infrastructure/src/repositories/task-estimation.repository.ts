import {
  TaskEstimation,
  TaskEstimationProps,
  TaskEstimationRepository,
} from '@lib/meeting/domain';
import { TaskEstimationOrmEntity } from '@lib/meeting/infrastructure/orm-entities';
import { TaskEstimationOrmMapper } from '@lib/meeting/infrastructure/orm-mappers';
import {
  MeetingPrismaService,
  PrismaRepository,
  QueryParams,
} from '@lib/shared';
import { Prisma } from '@prisma/meeting-client';

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
  ) {
    super(_meetingPrismaService.taskEstimation, _taskEstimationOrmMapper);
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
            data: ormProps.memberEstimations,
          },
        },
      },
      update: {
        ...ormProps,
        memberEstimations: {
          upsert: ormProps.memberEstimations.map((memberEstimation) => ({
            where: { id: memberEstimation.id },
            create: { ...memberEstimation },
            update: { ...memberEstimation },
          })),
        },
      },
    };
  }
}
