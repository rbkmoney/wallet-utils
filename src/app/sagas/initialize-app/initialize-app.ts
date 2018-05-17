import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { loadConfig } from './load-config';
import {
    InitializeAppCompleted,
    InitializeAppFailed,
    TypeKeys
} from 'app/actions';
import { State } from 'app/state';
import { initializeModel } from 'app/sagas/initialize-model';

type InitializeAppPutEffect =
    InitializeAppCompleted |
    InitializeAppFailed;

export type InitializeAppEffect =
    CallEffect |
    PutEffect<InitializeAppPutEffect> |
    SelectEffect;

export function* initializeApp(): Iterator<InitializeAppEffect> {
    try {
        yield call(loadConfig);
        const endpoint = yield select((state: State) => state.config.appConfig.wapiEndpoint);
        const initConfig = yield select((state: State) => state.config.initConfig);
        yield call(initializeModel, endpoint, initConfig);
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
