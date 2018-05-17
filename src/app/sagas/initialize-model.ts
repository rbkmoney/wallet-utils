import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { InitConfig } from 'app/config';
import { TypeKeys } from 'app/actions';
import { InitializeModelCompleted } from 'app/actions/model-actions/initialize-action';
import { IdentityChallengeInitConfig } from 'app/config/identity-challenge-init-config';
import { ActionType } from '../../communication/model';
import { getIdentityByID } from 'app/backend/get-identity';

export function* resolveIdenity(endpoint: string, config: IdentityChallengeInitConfig): Iterator<CallEffect> {
    const token = config.token;
    const id = config.params.identityID;
    return yield call(getIdentityByID, endpoint, token, id);
}

export function* resolveIntegrationType(endpoint: string, config: InitConfig): Iterator<CallEffect> {
    let chunk;
    switch (config.type) {
        case ActionType.userIdentity:
            chunk = yield call(resolveIdenity, endpoint, config);
            break;
    }
    return chunk;
}

export type InitializeEffect = CallEffect | PutEffect<InitializeModelCompleted>;

export function* initializeModel(endpoint: string, config: InitConfig): Iterator<InitializeEffect> {
    const modelChunk = yield call(resolveIntegrationType, endpoint, config);
    yield put({type: TypeKeys.INITIALIZE_MODEL_COMPLETED, payload: modelChunk} as InitializeModelCompleted);
}
