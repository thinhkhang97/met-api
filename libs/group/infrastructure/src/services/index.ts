import { GroupService, IdentityService } from '@lib/group/domain';
import { Provider } from '@nestjs/common';

import { GroupServiceImpl } from './group.service';
import { IdentityServiceImpl } from './identity.service';

export const services: Provider[] = [
  { provide: GroupService, useClass: GroupServiceImpl },
  { provide: IdentityService, useClass: IdentityServiceImpl },
];
