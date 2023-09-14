import { BaseRule } from '@lib/shared';

export class MemberMustHaveNameRule extends BaseRule {
  constructor(private readonly _memberName: string) {
    super();
  }

  getErrorMessage(): string {
    return 'member_must_have_name';
  }

  isFailed(): boolean {
    return !this._memberName.trim();
  }
}
