import { all } from 'redux-saga/effects';
import { watchInitializeApp } from './initialize-app';
import { watchBindingRequest } from './save-card';
import { watchSaveInsuranceRequest, watchSavePassportRequest } from './save-document';
import { watchBindCardRequest, watchBindDocumentsRequest } from './binding';

export default function* rootSaga(): any {
    yield all([
        watchInitializeApp(),
        watchSavePassportRequest(),
        watchSaveInsuranceRequest(),
        watchInitializeApp(),
        watchBindingRequest(),
        watchBindDocumentsRequest(),
        watchBindCardRequest()
    ]);
}
