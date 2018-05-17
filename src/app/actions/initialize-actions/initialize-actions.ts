import { AbstractAction, TypeKeys } from 'app/actions';
import { InitConfig } from 'app/config';
import { LogicError } from 'app/backend/model';

export interface InitializeAppRequested extends AbstractAction<InitConfig> {
    type: TypeKeys.INITIALIZE_APP_REQUESTED;
    payload: InitConfig;
}

export interface InitializeAppCompleted extends AbstractAction {
    type: TypeKeys.INITIALIZE_APP_COMPLETED;
}

export interface InitializeAppFailed extends AbstractAction<LogicError> {
    type: TypeKeys.INITIALIZE_APP_FAILED;
    payload: LogicError;
}

export const initializeApp = () => ({
    type: TypeKeys.INITIALIZE_APP_REQUESTED
});
