import {
    InitializeAppState,
    ConfigState,
    ModelState,
    ResultState
} from '.';

export interface State {
    readonly initializeApp: InitializeAppState;
    readonly config: ConfigState;
    readonly model: ModelState;
    readonly result: ResultState;
}
