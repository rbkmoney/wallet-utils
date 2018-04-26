import { LogicError, CancelEvent } from '.';

export interface ErrorCancelEvent extends CancelEvent {
    error: LogicError;
}
