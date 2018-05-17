import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { ConfigChunkReceived, TypeKeys } from 'app/actions';
import { getAppConfig } from 'app/backend/get-app-config';

type LoadConfigEffect = PutEffect<ConfigChunkReceived> | CallEffect;

export function* loadConfig(): IterableIterator<LoadConfigEffect> {
    const appConfig = yield call(getAppConfig);
    yield put({
        type: TypeKeys.CONFIG_CHUNK_RECEIVED,
        payload: {
            appConfig
        }
    } as ConfigChunkReceived);
}
