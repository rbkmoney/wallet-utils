import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import {
    CardBindingRequested,
    CardSavingCompleted,
    CardSavingFailed,
    CardSavingRequested,
    SetViewInfoProcess,
    TypeKeys
} from 'app/actions';
import { CardFormValues, State } from 'app/state';
import { saveCard } from 'app/backend';
import { replaceSpaces } from 'app/sagas/save-card/replace-spaces';

const formatCardData = (values: any): CardFormValues => {
    const result: any = {};
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            result[key] = replaceSpaces(values[key].trim());
        }
    }
    return result;
};

type SavePutEffect = CardSavingCompleted | CardSavingFailed | CardBindingRequested | SetViewInfoProcess;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

function* save(action: CardSavingRequested): Iterator<SaveEffect> {
    try {
        yield put({
            type: TypeKeys.SET_VIEW_INFO_PROCESS,
            payload: true
        } as SetViewInfoProcess);
        const { config } = yield select((s: State) => ({ config: s.config }));
        const { values } = action.payload;
        const cardBinding = yield call(saveCard, config.appConfig.wapiEndpoint, config.initConfig.token, formatCardData(values));
        yield put({
            type: TypeKeys.CARD_SAVING_COMPLETED,
            payload: cardBinding
        } as CardSavingCompleted);
        yield put({
            type: TypeKeys.CARD_BINDING_REQUESTED
        } as CardBindingRequested);
    } catch (e) {
        yield put({
            type: TypeKeys.CARD_SAVING_FAILED,
            payload: e
        } as CardSavingFailed);
    }
}

export function* watchBindingRequest(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.CARD_SAVING_REQUESTED, save);
}
