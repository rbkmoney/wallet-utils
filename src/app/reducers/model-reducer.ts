import { ModelState } from 'app/state';
import {
    CardBindingCompleted,
    CardSavingCompleted,
    DocumentsBindingCompleted,
    EventPolled,
    InitializeModelCompleted,
    InsuranceSavingCompleted,
    PassportSavingCompleted,
    TypeKeys
} from 'app/actions';
import { mergeEvents } from 'app/utils/event-utils';
import { Event } from 'app/backend';

type ModelReducerAction =
    InitializeModelCompleted
    | PassportSavingCompleted
    | InsuranceSavingCompleted
    | EventPolled
    | CardSavingCompleted
    | DocumentsBindingCompleted
    | CardBindingCompleted;

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
        case TypeKeys.DOCUMENTS_BINDING_COMPLETED:
            return {
                ...s,
                identityChallenge: action.payload
            };
        case TypeKeys.CARD_BINDING_COMPLETED:
            return {
                ...s,
                destination: action.payload
            };
        case TypeKeys.EVENTS_POLLED:
            return {
                ...s,
                identityChallengeEvents: mergeEvents(s.identityChallengeEvents, action.payload) as Event[]
            };
    }
    return s;
}
