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
import { omit } from 'lodash';

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

  override preUpsert(entity: EstimationMeeting): Prisma.MeetingUpsertArgs {
    const ormProps = this._estimationMeetingOrmMapper.toOrm(entity);
    return {
      where: {
        id: ormProps.id,
      },
      create: {
        ...ormProps,
        members: {
          createMany: {
            data: (ormProps.members || []).map((member) =>
              omit(member, 'meetingId'),
            ),
          },
        },
        taskEstimations: undefined,
      },
      update: {
        ...ormProps,
        members: {
          upsert: (ormProps.members || []).map((member) => ({
            where: { id: member.id },
            create: omit(member, 'meetingId'),
            update: omit(member, 'meetingId'),
          })),
        },
        taskEstimations: undefined,
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
}
