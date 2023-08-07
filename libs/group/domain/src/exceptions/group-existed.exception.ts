import { BaseException } from '@lib/shared';

export class GroupExistedException extends BaseException {
  constructor() {
    super('group_existed');
  }
}
