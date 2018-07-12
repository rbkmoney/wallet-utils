import {
    InsuranceSavingCompleted,
    InsuranceSavingFailed,
    PassportSavingRequested,
    SetViewInfoProcess,
    TypeKeys,
    DocumentsBindingRequested
} from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { State } from 'app/state';
import { saveDocument } from 'app/backend';

type SavePutEffect = InsuranceSavingCompleted | InsuranceSavingFailed | SetViewInfoProcess | DocumentsBindingRequested;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

function* save(action: PassportSavingRequested): Iterator<SaveEffect> {
    try {
        yield put({
            type: TypeKeys.SET_VIEW_INFO_PROCESS,
            payload: true
        } as SetViewInfoProcess);
        const { config } = yield select((s: State) => ({ config: s.config }));
        const { values, type } = action.payload;
        const savedDocument = yield call(saveDocument, config.appConfig.wapiEndpoint, config.initConfig.token, {
            ...values,
            type
        });
        yield put({
            type: TypeKeys.INSURANCE_SAVING_COMPLETED,
            payload: savedDocument
        } as InsuranceSavingCompleted);
        yield put({
            type: TypeKeys.DOCUMENTS_BINDING_REQUESTED
        } as DocumentsBindingRequested);
    } catch (e) {
        yield put({
            type: TypeKeys.INSURANCE_SAVING_FAILED,
            payload: e
        } as InsuranceSavingFailed);
    }
}

export function* watchSaveInsuranceRequest(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.INSURANCE_SAVING_REQUESTED, save);
}
