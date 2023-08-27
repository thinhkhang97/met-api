export interface EventHandlerResult<Data = unknown> {
  emitMessage?: string;
  data: Data;
}
