import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { BindCardRequested, SaveCardCompleted, SaveCardFailed, SaveCardRequested, TypeKeys } from 'app/actions';
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

type SavePutEffect = SaveCardCompleted | SaveCardFailed | BindCardRequested;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

function* save(action: SaveCardRequested): Iterator<SaveEffect> {
    try {
        const { config } = yield select((s: State) => ({ config: s.config }));
        const { values } = action.payload;
        const cardBinding = yield call(saveCard, config.appConfig.wapiEndpoint, config.initConfig.token, formatCardData(values));
        yield put({
            type: TypeKeys.SAVE_CARD_COMPLETED,
            payload: cardBinding
        } as SaveCardCompleted);
        yield put({
            type: TypeKeys.CARD_BINDING_REQUEST
        } as BindCardRequested);
    } catch (e) {
        yield put({
            type: TypeKeys.SAVE_CARD_FAILED,
            payload: e
        } as SaveCardFailed);
    }
}

export function* watchBindingRequest(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.SAVE_CARD_REQUEST, save);
}
