import { GroupService } from '@lib/group/domain';
import { Provider } from '@nestjs/common';

import { GroupServiceImpl } from './group.service';

export const services: Provider[] = [
  { provide: GroupService, useClass: GroupServiceImpl },
];
