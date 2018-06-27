import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { BindingCompleted, BindingFailed, BindingRequested, Direction, GoToFormInfo, TypeKeys } from 'app/actions';
import { CardFormValues, ResultFormInfo, State } from 'app/state';
import { createCardBinding } from 'app/backend';
import { replaceSpaces } from 'app/sagas/card-binding/replace-spaces';

const formatCardData = (values: any): CardFormValues => {
    const result: any = {};
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            result[key] = replaceSpaces(values[key].trim());
        }
    }
    return result;
};

type BindPutEffect = BindingCompleted | BindingFailed | GoToFormInfo;

type BindEffect = SelectEffect |
    CallEffect |
    PutEffect<BindPutEffect>;

function* bind(action: BindingRequested): Iterator<BindEffect> {
    try {
        const { config } = yield select((s: State) => ({ config: s.config }));
        const { values } = action.payload;
        const cardBinding = yield call(createCardBinding, config.appConfig.wapiEndpoint, config.initConfig.token, formatCardData(values));
        yield put({
            type: TypeKeys.BINDING_COMPLETED,
            payload: cardBinding
        } as BindingCompleted);
        yield put({
            type: TypeKeys.GO_TO_FORM_INFO,
            payload: { formInfo: new ResultFormInfo(), direction: Direction.forward }
        } as GoToFormInfo);
    } catch (e) {
        yield put({
            type: TypeKeys.BINDING_FAILED,
            payload: e
        } as BindingFailed);
    }
}

export function* watchBindingRequest(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.BINDING_REQUEST, bind);
}
