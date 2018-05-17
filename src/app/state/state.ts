import {
    InitializeAppState,
    ConfigState
} from '.';

export interface State {
    readonly initializeApp: InitializeAppState;
    readonly config: ConfigState;
}
