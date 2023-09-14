import { BaseResultObject } from '@lib/shared';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeetingActionResultObject extends BaseResultObject {}
