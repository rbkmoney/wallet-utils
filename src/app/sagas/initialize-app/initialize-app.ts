import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { loadAppConfig } from './load-app-config';
import { InitializeAppCompleted, InitializeAppFailed, TypeKeys } from 'app/actions';
import { State } from 'app/state';
import { initializeModel } from './initialize-model';
import { initializeModal } from './initialize-modal';
import { ActionType } from 'app/config';

type InitializeAppPutEffect =
    InitializeAppCompleted |
    InitializeAppFailed;

export type InitializeAppEffect =
    CallEffect |
    PutEffect<InitializeAppPutEffect> |
    SelectEffect;

const isInitializeModelNeeded = (type: ActionType) => {
    switch (type) {
        case ActionType.userIdentity:
            return true;
    }
    return false;
};

export function* initializeApp(): Iterator<InitializeAppEffect> {
    try {
        yield call(loadAppConfig);
        const config = yield select((state: State) => state.config);
        const { appConfig: { wapiEndpoint }, initConfig } = config;
        let model;
        if (isInitializeModelNeeded(initConfig.type)) {
            model = yield call(initializeModel, wapiEndpoint, initConfig);
        }
        yield call(initializeModal, initConfig, model);
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
