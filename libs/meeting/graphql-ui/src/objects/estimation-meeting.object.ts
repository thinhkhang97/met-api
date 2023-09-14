import { EstimationMeeting } from '@lib/meeting/domain';
import { EstimationMeetingStatus } from '@lib/meeting/domain/constance';
import { TaskEstimationObject } from '@lib/meeting/graphql-ui/objects/task-estimation.object';
import { Field, ObjectType } from '@nestjs/graphql';

import { MeetingObject } from './meeting.object';

@ObjectType()
export class EstimationMeetingObject extends MeetingObject {
  @Field(() => [TaskEstimationObject])
  public taskEstimations: TaskEstimationObject[];

  @Field(() => EstimationMeetingStatus)
  public readonly status: EstimationMeetingStatus;

  constructor(entity: EstimationMeeting) {
    super(entity);
    const props = entity.getProps();
    this.status = props.status;
    this.taskEstimations = props.taskEstimations.currentActiveTasks.map(
      (task) => new TaskEstimationObject(task),
    );
  }
}
