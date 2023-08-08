import { BaseException } from '@lib/shared';

export class GroupNotFoundException extends BaseException {
  constructor() {
    super('group_not_found');
  }
}
