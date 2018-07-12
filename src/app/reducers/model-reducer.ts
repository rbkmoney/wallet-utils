import { ModelState } from 'app/state';
import { CardSavingCompleted, InsuranceSavingCompleted, PassportSavingCompleted, TypeKeys, InitializeModelCompleted } from 'app/actions';

type ModelReducerAction =
    InitializeModelCompleted
    | PassportSavingCompleted
    | InsuranceSavingCompleted
    | CardSavingCompleted;

export function modelReducer(s: ModelState = null, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_MODEL_COMPLETED:
            return {
                ...s,
                ...action.payload
            };
        case TypeKeys.INSURANCE_SAVING_COMPLETED:
            return {
                ...s,
                tokenizedInsurance: action.payload
            };
        case TypeKeys.PASSPORT_SAVING_COMPLETED:
            return {
                ...s,
                tokenizedPassport: action.payload
            };
        case TypeKeys.CARD_SAVING_COMPLETED:
            return {
                ...s,
                tokenizedCard: action.payload
            };
    }
    return s;
}
