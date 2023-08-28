export interface EventHandlerResult<Data = unknown> {
  room: string;
  message: string;
  data?: Data;
}
