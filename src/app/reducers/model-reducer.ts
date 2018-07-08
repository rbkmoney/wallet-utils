import { ModelState } from 'app/state';
import { SaveCardCompleted, SaveInsuranceCompleted, SavePassportCompleted, TypeKeys, InitializeModelCompleted } from 'app/actions';

type ModelReducerAction =
    InitializeModelCompleted
    | SavePassportCompleted
    | SaveInsuranceCompleted
    | SaveCardCompleted;

export function modelReducer(s: ModelState = null, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_MODEL_COMPLETED:
            return {
                ...s,
                ...action.payload
            };
        case TypeKeys.SAVE_INSURANCE_COMPLETED:
            return {
                ...s,
                tokenizedInsurance: action.payload
            };
        case TypeKeys.SAVE_PASSPORT_COMPLETED:
            return {
                ...s,
                tokenizedPassport: action.payload
            };
        case TypeKeys.SAVE_CARD_COMPLETED:
            return {
                ...s,
                tokenizedCard: action.payload
            };
    }
    return s;
}
