import { put, PutEffect, takeLatest } from 'redux-saga/effects';
import { Direction, GoToFormInfo, SetViewInfoProcess, TypeKeys } from 'app/actions';
import { ResultFormInfo } from 'app/state';

type FinishEffect = PutEffect<GoToFormInfo | SetViewInfoProcess>;

function* finish(): Iterator<FinishEffect> {
    yield put({
        type: TypeKeys.SET_VIEW_INFO_PROCESS,
        payload: false
    } as SetViewInfoProcess);
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
