import {
    BindCardFailed,
    BindDocumentsFailed,
    InitializeAppFailed,
    SaveCardFailed,
    SaveInsuranceFailed,
    SavePassportFailed,
    TypeKeys
} from 'app/actions';
import { ErrorState } from 'app/state';

type ErrorReducerAction = InitializeAppFailed
    | BindCardFailed
    | BindDocumentsFailed
    | SaveInsuranceFailed
    | SavePassportFailed
    | SaveCardFailed;

export function errorReducer(s: ErrorState = null, action: ErrorReducerAction): ErrorState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_APP_FAILED:
        case TypeKeys.CARD_BINDING_FAILED:
        case TypeKeys.DOCUMENTS_BINDING_FAILED:
        case TypeKeys.SAVE_INSURANCE_FAILED:
        case TypeKeys.SAVE_PASSPORT_FAILED:
        case TypeKeys.SAVE_CARD_FAILED:
            console.error(action.payload);
            return {
                error: action.payload
            };
    }
    return s;
}
