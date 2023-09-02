import { EstimationTaskInvalidException } from '@lib/meeting/domain';
import { ValueObject, ValueObjectProps } from '@lib/shared';

export class TaskTitle extends ValueObject<string> {
  public static create(title: string) {
    return new TaskTitle({ value: title });
  }

  protected validate(props: ValueObjectProps<string>): void {
    if (!props.value.trim()) {
      throw new EstimationTaskInvalidException();
    }
  }
}
