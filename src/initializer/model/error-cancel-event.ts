import { CancelEvent } from '.';
import { LogicError } from 'app/backend';

export interface ErrorCancelEvent extends CancelEvent {
    error: LogicError;
}
