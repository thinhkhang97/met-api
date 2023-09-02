import { TaskEstimation } from '@lib/meeting/domain';
import { WatchedList } from '@lib/shared';

export class TaskEstimationWatchedList extends WatchedList<TaskEstimation> {
  compare(item1: TaskEstimation, item2: TaskEstimation): boolean {
    return item1.equals(item2);
  }
}
