import {
    SaveInsuranceCompleted,
    SaveInsuranceFailed,
    SavePassportRequested,
    SetInProcessState,
    TypeKeys,
    BindDocumentsRequested
} from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { State } from 'app/state';
import { saveDocument } from 'app/backend';

type SavePutEffect = SaveInsuranceCompleted | SaveInsuranceFailed | SetInProcessState | BindDocumentsRequested;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

function* save(action: SavePassportRequested): Iterator<SaveEffect> {
    try {
        yield put({
            type: TypeKeys.SET_IN_PROCESS,
            payload: true
        } as SetInProcessState);
        const { config } = yield select((s: State) => ({ config: s.config }));
        const { values, type } = action.payload;
        const savedDocument = yield call(saveDocument, config.appConfig.wapiEndpoint, config.initConfig.token, {
            ...values,
            type
        });
        yield put({
            type: TypeKeys.SET_IN_PROCESS,
            payload: false
        } as SetInProcessState);
        yield put({
            type: TypeKeys.SAVE_INSURANCE_COMPLETED,
            payload: savedDocument
        } as SaveInsuranceCompleted);
        yield put({
            type: TypeKeys.DOCUMENTS_BINDING_REQUESTED
        } as BindDocumentsRequested);
    } catch (e) {
        yield put({
            type: TypeKeys.SAVE_INSURANCE_FAILED,
            payload: e
        } as SaveInsuranceFailed);
    }
}

export function* watchSaveInsuranceRequest(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.SAVE_INSURANCE_REQUESTED, save);
}
