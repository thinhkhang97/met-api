import { BaseErrorObject } from '@lib/shared';
import { ObjectType } from '@nestjs/graphql';

@ObjectType('MemberBaseError')
export class MemberBaseErrorObject extends BaseErrorObject {}
