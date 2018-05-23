import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { InitConfig, IdentityChallengeInitConfig, ActionType } from 'src/app/config';
import { getIdentityByID, Identity } from 'app/backend/index';
import { InitializeModelCompleted, TypeKeys } from 'app/actions';
import { ModelState } from 'app/state';

export function* resolveIdentity(endpoint: string, config: IdentityChallengeInitConfig): Iterator<CallEffect | Identity> {
    const token = config.token;
    const id = config.params.identityID;
    return yield call(getIdentityByID, endpoint, token, id);
}

interface ResolvedActionType {
    identity?: Identity;
}

export function* resolveActionType(endpoint: string, config: InitConfig): Iterator<CallEffect | ResolvedActionType | ModelState> {
    switch (config.type) {
        case ActionType.userIdentity:
            const identity = yield call(resolveIdentity, endpoint, config);
            return {identity};
        case ActionType.createOutput:
            return;
    }
}

export type InitializeEffect = CallEffect | PutEffect<InitializeModelCompleted>;

export function* initializeModel(endpoint: string, config: InitConfig): Iterator<InitializeEffect> {
    const modelChunk = yield call(resolveActionType, endpoint, config);
    yield put({type: TypeKeys.INITIALIZE_MODEL_COMPLETED, payload: modelChunk} as InitializeModelCompleted);
}
