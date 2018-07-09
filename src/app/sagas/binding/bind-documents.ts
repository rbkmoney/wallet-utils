import { BindDocumentsCompleted, BindDocumentsFailed, SetInProcessState, TypeKeys } from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { State } from 'app/state';
import { bindDocuments } from 'app/backend';

type BindPutEffect = BindDocumentsCompleted | BindDocumentsFailed | SetInProcessState;

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
