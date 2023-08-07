import { BaseErrorObject } from '@lib/shared';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GroupBaseErrorObject extends BaseErrorObject {}
