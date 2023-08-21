import { BaseEntity, Nullable } from '@lib/shared';

interface CreateTaskProps {
  /**
   * Title of task
   */
  title: string;

  /**
   * The description for the task
   */
  description: Nullable<string>;
}

type TaskProps = CreateTaskProps;

export class Task extends BaseEntity<TaskProps> {
  /**
   * Create a new task to estimate
   * @param props
   */
  public static create(props: CreateTaskProps) {
    return new Task(props);
  }

  validate() {
    return;
  }
}
