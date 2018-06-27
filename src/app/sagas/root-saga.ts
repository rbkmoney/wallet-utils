import { all } from 'redux-saga/effects';
import { watchInitializeApp } from './initialize-app';
import { watchBindingRequest } from './card-binding';

export default function* rootSaga(): any {
    yield all([
        watchInitializeApp(),
        watchBindingRequest()
    ]);
}
