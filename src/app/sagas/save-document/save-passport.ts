import {
    Direction,
    GoToFormInfo,
    SavePassportCompleted,
    SavePassportFailed,
    SavePassportRequested,
    SetInProgressState,
    TypeKeys
} from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { InsuranceFormInfo, State } from 'app/state';
import { saveDocument } from 'app/backend';

type SavePutEffect = SavePassportCompleted | SavePassportFailed | GoToFormInfo | SetInProgressState;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

function* save(action: SavePassportRequested): Iterator<SaveEffect> {
    try {
        yield put({
            type: TypeKeys.SET_IN_PROGRESS,
            payload: true
        } as SetInProgressState);
        const { config } = yield select((s: State) => ({ config: s.config }));
        const { values, type } = action.payload;
        const savedDocument = yield call(saveDocument, config.appConfig.wapiEndpoint, config.initConfig.token, {...values, type});
        yield put({
            type: TypeKeys.SAVE_PASSPORT_COMPLETED,
            payload: savedDocument
        } as SavePassportCompleted);
        yield put({
            type: TypeKeys.SET_IN_PROGRESS,
            payload: false
        } as SetInProgressState);
        yield put({
            type: TypeKeys.GO_TO_FORM_INFO,
            payload: { formInfo: new InsuranceFormInfo(), direction: Direction.forward }
        } as GoToFormInfo);
    } catch (e) {
        yield put({
            type: TypeKeys.SAVE_PASSPORT_FAILED,
            payload: e
        } as SavePassportFailed);
    }
}

export function* watchSavePassportRequest(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.SAVE_PASSPORT_REQUESTED, save);
}
