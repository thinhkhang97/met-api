import { GetGroupQueryHandler } from '@lib/group/application/queries/get-group/get-group.query-handler';
import { Provider } from '@nestjs/common';

export * from './get-group/get-group.query';

export const queries: Provider[] = [GetGroupQueryHandler];
