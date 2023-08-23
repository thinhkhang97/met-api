import { MeetingStatus } from '@lib/meeting/domain/constance';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(MeetingStatus, { name: 'MeetingStatus' });
