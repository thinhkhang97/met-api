import { MemberRole } from '@lib/meeting/domain/constance';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(MemberRole, { name: 'MemberRole' });
