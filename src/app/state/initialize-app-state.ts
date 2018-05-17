import { LogicError } from 'app/backend/model';

type Error = LogicError;

export interface InitializeAppState {
    initialized: boolean;
    error?: Error;
}
