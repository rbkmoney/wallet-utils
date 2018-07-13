import {
    CardBindingCompleted,
    CardBindingFailed,
    Direction,
    GoToFormInfo,
    SetViewInfoProcess,
    TypeKeys
} from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { ResultFormInfo } from 'app/state';
import { tokenizeCard } from './save-card';
import { bind } from './bind-card';

type FinishEffect = PutEffect<GoToFormInfo | SetViewInfoProcess>;

type BindPutEffect = CardBindingCompleted | CardBindingFailed;

type BindEffect = CallEffect |
    PutEffect<BindPutEffect>;

function* start(): Iterable<BindEffect | FinishEffect> {
    try {
        yield put({
            type: TypeKeys.SET_VIEW_INFO_PROCESS,
            payload: true
        } as SetViewInfoProcess);
        yield call(tokenizeCard);
        yield call(bind);
        yield put({
            type: TypeKeys.SET_VIEW_INFO_PROCESS,
            payload: false
        } as SetViewInfoProcess);
        yield put({
            type: TypeKeys.GO_TO_FORM_INFO,
            payload: { formInfo: new ResultFormInfo(), direction: Direction.forward }
        } as GoToFormInfo);
    } catch (e) {
        yield put({
            type: TypeKeys.CARD_BINDING_FAILED,
            payload: e
        } as CardBindingFailed);
    }
}

export function* watchCreateOutput(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.CARD_BINDING_REQUESTED, start);
}
