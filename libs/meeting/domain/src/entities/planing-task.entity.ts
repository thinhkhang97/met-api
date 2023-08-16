import { BaseEntity, Nullable } from '@lib/shared';

interface CreatePlaningTaskProps {
  /**
   * Deep dive meeting id
   */
  meetingId: string;

  /**
   * Title of task
   */
  title: string;

  /**
   * The description for the task
   */
  description: Nullable<string>;
}

type PlaningTaskProps = CreatePlaningTaskProps;

export class PlaningTask extends BaseEntity<PlaningTaskProps> {
  /**
   * Create a new task to estimate
   * @param props
   */
  public static create(props: CreatePlaningTaskProps) {
    return new PlaningTask(props);
  }

  validate() {
    return;
  }
}
