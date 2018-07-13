import { all } from 'redux-saga/effects';
import { watchInitializeApp } from './initialize-app';
import { watchStartIdentityChallenge } from './identity-challenge';
import { watchCreateOutput } from './create-output';

export default function* rootSaga(): any {
    yield all([
        watchInitializeApp(),
        watchStartIdentityChallenge(),
        watchCreateOutput()
    ]);
}
