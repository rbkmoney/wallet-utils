import {
    InitializeAppState,
    ConfigState,
    ModelState,
    ResultState,
    FormsState,
    ModalState,
    ErrorState
} from '.';

export interface State {
    readonly initializeApp: InitializeAppState;
    readonly config: ConfigState;
    readonly model: ModelState;
    readonly modals: ReadonlyArray<ModalState>;
    readonly result: ResultState;
    readonly form: FormsState;
    readonly error: ErrorState;
}
