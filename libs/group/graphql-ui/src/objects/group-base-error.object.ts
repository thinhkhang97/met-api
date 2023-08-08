import { BaseErrorObject } from '@lib/shared';
import { ObjectType } from '@nestjs/graphql';

@ObjectType('GroupBaseError')
export class GroupBaseErrorObject extends BaseErrorObject {}
