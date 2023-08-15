import { BaseException } from '@lib/shared';

export class MemberExistedException extends BaseException {
  constructor() {
    super('member_existed');
  }
}
