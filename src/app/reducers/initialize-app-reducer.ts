import { InitializeAppCompleted, InitializeAppFailed, InitializeAppRequested, TypeKeys } from 'app/actions';
import { InitializeAppState } from 'app/state';

type InitializeAppAction =
    InitializeAppFailed |
    InitializeAppRequested |
    InitializeAppCompleted;

const initState = {
    initialized: false
};

export const initializeAppReducer = (s: InitializeAppState = initState, action: InitializeAppAction) => {
    switch (action.type) {
        case TypeKeys.INITIALIZE_APP_COMPLETED:
            return {
                ...s,
                initialized: true
            };
        case TypeKeys.INITIALIZE_APP_FAILED:
            return {
                ...s,
                error: action.payload
            };
    }
    return s;
};
