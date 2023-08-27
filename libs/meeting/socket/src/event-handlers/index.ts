import { Provider } from '@nestjs/common';

import { MeetingEventHandler } from './meeting.event-handler';

export * from './meeting.event-handler';
export const eventHandlers: Provider[] = [MeetingEventHandler];
