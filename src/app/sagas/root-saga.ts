import { all } from 'redux-saga/effects';
import { watchInitializeApp } from './initialize-app';
import { watchStartIdentityChallenge } from './identity-challenge';
import { watchCreateDestination } from './create-destination';

export default function* rootSaga(): any {
    yield all([
        watchInitializeApp(),
        watchStartIdentityChallenge(),
        watchCreateDestination()
    ]);
}
