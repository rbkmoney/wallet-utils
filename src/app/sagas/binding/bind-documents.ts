import {
    BindDocumentsCompleted,
    BindDocumentsFailed,
    Direction,
    GoToFormInfo,
    SetInProgressState,
    TypeKeys
} from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { ResultFormInfo, State } from 'app/state';
import { bindDocuments } from 'app/backend';

type BindPutEffect = BindDocumentsCompleted | BindDocumentsFailed | GoToFormInfo | SetInProgressState;

type BindEffect = SelectEffect |
    CallEffect |
    PutEffect<BindPutEffect>;

function* bind(): Iterator<BindEffect> {
    try {
        const { config, tokenizedPassport, tokenizedInsurance, identityID } = yield select((s: State) => ({
            config: s.config,
            tokenizedPassport: s.model.tokenizedPassport,
            tokenizedInsurance: s.model.tokenizedInsurance,
            identityID: s.config.initConfig.params.identityID
        }));
        yield call(bindDocuments, config.appConfig.wapiEndpoint, config.initConfig.token, identityID, {
            proofs: [
                { token: tokenizedInsurance.token },
                { token: tokenizedPassport.token }
            ],
            type: 'esia' // TODO: убрать хардкод
        });
        yield put({
            type: TypeKeys.DOCUMENTS_BINDING_COMPLETED
        } as BindDocumentsCompleted);
        yield put({
            type: TypeKeys.SET_IN_PROGRESS,
            payload: false
        } as SetInProgressState);
        yield put({
            type: TypeKeys.GO_TO_FORM_INFO,
            payload: { formInfo: new ResultFormInfo(), direction: Direction.forward }
        } as GoToFormInfo);
    } catch (e) {
        yield put({
            type: TypeKeys.DOCUMENTS_BINDING_FAILED,
            payload: e
        } as BindDocumentsFailed);
    }
}

export function* watchBindDocumentsRequest(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.DOCUMENTS_BINDING_REQUESTED, bind);
}
