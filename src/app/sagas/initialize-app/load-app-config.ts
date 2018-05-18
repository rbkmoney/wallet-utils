import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { AppConfigReceived, TypeKeys } from 'app/actions';
import { getAppConfig } from 'app/backend';

type LoadConfigEffect = CallEffect | PutEffect<AppConfigReceived>;

export function* loadAppConfig(): IterableIterator<LoadConfigEffect> {
    const appConfig = yield call(getAppConfig);
    yield put({
        type: TypeKeys.APP_CONFIG_RECEIVED,
        payload: {
            appConfig
        }
    } as AppConfigReceived);
}
