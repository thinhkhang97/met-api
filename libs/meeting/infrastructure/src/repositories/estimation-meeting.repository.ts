import {
  EstimationMeeting,
  EstimationMeetingProps,
  EstimationMeetingRepository,
} from '@lib/meeting/domain';
import { EstimationMeetingOrmEntity } from '@lib/meeting/infrastructure/orm-entities';
import { EstimationMeetingOrmMapper } from '@lib/meeting/infrastructure/orm-mappers';
import {
  MeetingPrismaService,
  PrismaRepository,
  QueryParams,
  WhereCondition,
} from '@lib/shared';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/meeting-client';

@Injectable()
export class EstimationMeetingRepositoryImpl
  extends PrismaRepository<
    EstimationMeeting,
    EstimationMeetingProps,
    EstimationMeetingOrmEntity,
    Prisma.MeetingDelegate<undefined>
  >
  implements EstimationMeetingRepository
{
  constructor(
    private readonly _estimationMeetingOrmMapper: EstimationMeetingOrmMapper,
    private readonly _meetingPrismaService: MeetingPrismaService,
  ) {
    super(_meetingPrismaService.meeting, _estimationMeetingOrmMapper);
  }

  getIncludeRelation():
    | { include: { [key in keyof EstimationMeetingProps]?: boolean } }
    | undefined {
    return {
      include: {
        members: true,
      },
    };
  }

  protected getWhereCondition(
    props: QueryParams<EstimationMeetingProps>,
  ): WhereCondition {
    const whereCondition: Prisma.MeetingWhereInput = {};
    if (props.id) {
      whereCondition.id = props.id.value;
    }
    return whereCondition;
  }

  protected preCreate(entity: EstimationMeeting): Prisma.MeetingCreateArgs {
    const ormProps = this._estimationMeetingOrmMapper.toOrm(entity);
    return {
      data: {
        ...ormProps,
        members: {
          createMany: {
            data: ormProps.members || [],
          },
        },
        taskEstimations: {
          createMany: {
            data: ormProps.taskEstimations || [],
          },
        },
      },
    };
  }
}
