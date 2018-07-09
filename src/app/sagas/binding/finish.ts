import { put, PutEffect, takeLatest } from 'redux-saga/effects';
import { Direction, GoToFormInfo, SetInProcessState, TypeKeys } from 'app/actions';
import { ResultFormInfo } from 'app/state';

type FinishEffect = PutEffect<GoToFormInfo | SetInProcessState>;

function* finish(): Iterator<FinishEffect> {
    yield put({
        type: TypeKeys.SET_IN_PROCESS,
        payload: false
    } as SetInProcessState);
    yield put({
        type: TypeKeys.GO_TO_FORM_INFO,
        payload: { formInfo: new ResultFormInfo(), direction: Direction.forward }
    } as GoToFormInfo);
}

export function* watchFinishedBinding() {
    yield takeLatest([
        TypeKeys.CARD_BINDING_COMPLETED,
        TypeKeys.DOCUMENTS_BINDING_COMPLETED,
        TypeKeys.CARD_BINDING_FAILED,
        TypeKeys.DOCUMENTS_BINDING_FAILED], finish);
}
