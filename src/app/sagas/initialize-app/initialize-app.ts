import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { loadConfig } from './load-config';
import {
    InitializeAppCompleted,
    InitializeAppFailed,
    TypeKeys
} from 'app/actions';

type InitializeAppPutEffect =
    InitializeAppCompleted |
    InitializeAppFailed;

export type InitializeAppEffect =
    CallEffect |
    PutEffect<InitializeAppPutEffect>;

export function* initializeApp(): Iterator<InitializeAppEffect> {
    try {
        yield call(loadConfig);
        yield put({
            type: TypeKeys.INITIALIZE_APP_COMPLETED
        } as InitializeAppCompleted);
    } catch (error) {
        yield put({
            type: TypeKeys.INITIALIZE_APP_FAILED,
            payload: error
        } as InitializeAppFailed);
    }
}

export function* watchInitializeApp(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.INITIALIZE_APP_REQUESTED, initializeApp);
}
