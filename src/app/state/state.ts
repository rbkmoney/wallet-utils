import {
    InitializeAppState,
    ConfigState,
    ModelState
} from '.';

export interface State {
    readonly initializeApp: InitializeAppState;
    readonly config: ConfigState;
    readonly model: ModelState;
}
