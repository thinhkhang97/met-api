import { TaskEstimation } from '@lib/meeting/domain';
import { TaskEstimationStatus } from '@lib/meeting/domain/constance';
import { WatchedList } from '@lib/shared';

export class TaskEstimationWatchedList extends WatchedList<TaskEstimation> {
  get currentActiveTasks() {
    return this.currentItems.filter(
      (item) => item.status !== TaskEstimationStatus.REMOVED,
    );
  }

  compare(item1: TaskEstimation, item2: TaskEstimation): boolean {
    return item1.equals(item2);
  }
}
