import { all } from 'redux-saga/effects';
import { watchInitializeApp } from './initialize-app';
import { watchBindingRequest } from './card-binding';
import { watchSaveInsuranceRequest, watchSavePassportRequest } from './save-document';

export default function* rootSaga(): any {
    yield all([
        watchInitializeApp(),
        watchSavePassportRequest(),
        watchSaveInsuranceRequest()
        watchInitializeApp(),
        watchBindingRequest()
    ]);
}
