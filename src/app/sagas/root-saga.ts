import { all } from 'redux-saga/effects';
import { watchInitializeApp } from './initialize-app';
import { watchSaveInsuranceRequest, watchSavePassportRequest } from './save-document';

export default function* rootSaga(): any {
    yield all([
        watchInitializeApp(),
        watchSavePassportRequest(),
        watchSaveInsuranceRequest()
    ]);
}
