import { call, CallEffect, put, PutEffect, SelectEffect } from 'redux-saga/effects';
import { DocumentsBindingCompleted, DocumentsBindingFailed, SetViewInfoProcess, TypeKeys } from 'app/actions';
import { bindDocuments, Document, TokenizedProofs } from 'app/backend';

type BindPutEffect = DocumentsBindingCompleted | DocumentsBindingFailed | SetViewInfoProcess;

type BindEffect = SelectEffect |
    CallEffect |
    PutEffect<BindPutEffect>;

const takeTokens = (documents: Document[]): TokenizedProofs[] => documents.reduce((acc, current) => [...acc, { token: current.token }], []);

export function* bind(documents: Document[], wapiEndpoint: string, accessToken: string, identityID: string): Iterator<BindEffect> {
    const identityChallenge = yield call(bindDocuments, wapiEndpoint, accessToken, identityID, {
        proofs: takeTokens(documents),
        type: 'esia' // TODO: убрать хардкод
    });
    yield put({
        type: TypeKeys.DOCUMENTS_BINDING_COMPLETED
    } as DocumentsBindingCompleted);
    return identityChallenge;
}
