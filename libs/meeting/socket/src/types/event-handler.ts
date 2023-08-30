export interface EventHandlerResult<Data = any> {
  room: string;
  message: string;
  data?: Data;
}
