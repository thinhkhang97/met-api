import { BaseRule } from '@lib/shared';

export class GroupMustHaveNameRule extends BaseRule {
  constructor(private readonly _groupName: string) {
    super();
  }

  getErrorMessage(): string {
    return 'group_must_have_name';
  }

  isFailed(): boolean {
    return !this._groupName.trim();
  }
}
