import { EstimationMeeting } from '@lib/meeting/domain';
import { TaskEstimationObject } from '@lib/meeting/graphql-ui/objects/task-estimation.object';
import { Field, ObjectType } from '@nestjs/graphql';

import { MeetingObject } from './meeting.object';

@ObjectType()
export class EstimationMeetingObject extends MeetingObject {
  @Field(() => [TaskEstimationObject])
  public taskEstimations: TaskEstimationObject[];

  constructor(entity: EstimationMeeting) {
    super(entity);
    const props = entity.getProps();
    this.taskEstimations = props.taskEstimations.currentItems.map(
      (task) => new TaskEstimationObject(task),
    );
  }
}
