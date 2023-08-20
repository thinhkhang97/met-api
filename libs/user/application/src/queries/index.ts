import { Provider } from '@nestjs/common';

import { GetUserQueryHandler } from './get-user/get-user.query-handler';
import { GetUserByEmailQueryHandler } from './get-user-by-email/get-user-by-email.query-handler';

export * from './get-user/get-user.query';
export * from './get-user-by-email/get-user-by-email.query';
export const queries: Provider[] = [
  GetUserQueryHandler,
  GetUserByEmailQueryHandler,
];
