import { Provider } from '@nestjs/common';

import { GroupQuery } from './group.query';

export * from './group.query';

export const queries: Provider[] = [GroupQuery];
