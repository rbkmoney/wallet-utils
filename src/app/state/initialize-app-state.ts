import { LogicError } from 'app/backend';

type Error = LogicError;

export interface InitializeAppState {
    initialized: boolean;
    error?: Error;
}
