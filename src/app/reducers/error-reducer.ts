import {
    CardBindingFailed,
    DocumentsBindingFailed,
    InitializeAppFailed,
    CardSavingFailed,
    InsuranceSavingFailed,
    PassportSavingFailed,
    TypeKeys
} from 'app/actions';
import { ErrorState } from 'app/state';

type ErrorReducerAction = InitializeAppFailed
    | CardBindingFailed
    | DocumentsBindingFailed
    | InsuranceSavingFailed
    | PassportSavingFailed
    | CardSavingFailed;

export function errorReducer(s: ErrorState = null, action: ErrorReducerAction): ErrorState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_APP_FAILED:
        case TypeKeys.CARD_BINDING_FAILED:
        case TypeKeys.DOCUMENTS_BINDING_FAILED:
        case TypeKeys.INSURANCE_SAVING_FAILED:
        case TypeKeys.PASSPORT_SAVING_FAILED:
        case TypeKeys.CARD_SAVING_FAILED:
            console.error(action.payload);
            return {
                error: action.payload
            };
    }
    return s;
}
