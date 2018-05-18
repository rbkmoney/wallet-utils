import { InitializeAppState } from 'app/state';

export interface AppProps {
    initializeApp: InitializeAppState;
    initApp: () => any;
}
