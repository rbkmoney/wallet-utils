import { DocumentsBindingCompleted, DocumentsBindingFailed, SetViewInfoProcess, TypeKeys } from 'app/actions';
import { call, CallEffect, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { State } from 'app/state';
import { bindDocuments } from 'app/backend';

type BindPutEffect = DocumentsBindingCompleted | DocumentsBindingFailed | SetViewInfoProcess;

type BindEffect = SelectEffect |
    CallEffect |
    PutEffect<BindPutEffect>;

export function* bind(): Iterator<BindEffect> {
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
    } as DocumentsBindingCompleted);
}
