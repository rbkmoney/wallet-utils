import {
    Direction,
    GoToFormInfo,
    PassportSavingCompleted,
    PassportSavingFailed,
    PassportSavingRequested,
    SetViewInfoProcess,
    TypeKeys
} from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { InsuranceFormInfo, State } from 'app/state';
import { saveDocument } from 'app/backend';

type SavePutEffect = PassportSavingCompleted | PassportSavingFailed | GoToFormInfo | SetViewInfoProcess;

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
        const savedDocument = yield call(saveDocument, config.appConfig.wapiEndpoint, config.initConfig.token, {...values, type});
        yield put({
            type: TypeKeys.PASSPORT_SAVING_COMPLETED,
            payload: savedDocument
        } as PassportSavingCompleted);
        yield put({
            type: TypeKeys.SET_VIEW_INFO_PROCESS,
            payload: false
        } as SetViewInfoProcess);
        yield put({
            type: TypeKeys.GO_TO_FORM_INFO,
            payload: { formInfo: new InsuranceFormInfo(), direction: Direction.forward }
        } as GoToFormInfo);
    } catch (e) {
        yield put({
            type: TypeKeys.PASSPORT_SAVING_FAILED,
            payload: e
        } as PassportSavingFailed);
    }
}

export function* watchSavePassportRequest(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.PASSPORT_SAVING_REQUESTED, save);
}
