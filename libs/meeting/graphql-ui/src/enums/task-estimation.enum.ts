import { TaskEstimationStatus } from '@lib/meeting/domain/constance';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(TaskEstimationStatus, { name: 'TaskEstimationStatus' });
