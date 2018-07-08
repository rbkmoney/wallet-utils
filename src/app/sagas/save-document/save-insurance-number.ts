import {
    Direction,
    GoToFormInfo,
    SaveInsuranceCompleted,
    SaveInsuranceFailed,
    SavePassportRequested,
    TypeKeys
} from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { ResultFormInfo, State } from 'app/state';
import { saveDocument } from 'app/backend';

type SavePutEffect = SaveInsuranceCompleted | SaveInsuranceFailed | GoToFormInfo;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

function* save(action: SavePassportRequested): Iterator<SaveEffect> {
    try {
        const { config } = yield select((s: State) => ({ config: s.config }));
        const { values, type } = action.payload;
        const savedDocument = yield call(saveDocument, config.appConfig.wapiEndpoint, config.initConfig.token, {
            ...values,
            type
        });
        yield put({
            type: TypeKeys.SAVE_INSURANCE_COMPLETED,
            payload: savedDocument
        } as SaveInsuranceCompleted);
        yield put({
            type: TypeKeys.GO_TO_FORM_INFO,
            payload: { formInfo: new ResultFormInfo(), direction: Direction.forward }
        } as GoToFormInfo);
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
