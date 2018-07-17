import { call, CallEffect, put, PutEffect } from 'redux-saga/effects';
import { ActionType, IdentityChallengeInitConfig, InitConfig } from 'app/config';
import { getIdentityByID, getIdentityEventsByID, Identity, Event } from 'app/backend';
import { InitializeModelCompleted, TypeKeys } from 'app/actions';

interface ModelChunk {
    identity?: Identity;
    identityChallengeEvents?: Event[];
}

export function* resolveIdentity(endpoint: string, config: IdentityChallengeInitConfig): Iterator<CallEffect | ModelChunk> {
    const token = config.token;
    const id = config.params.identityID;
    const identity = yield call(getIdentityByID, endpoint, token, id);
    let identityChallengeEvents;
    if (identity.effectiveChallenge) {
        identityChallengeEvents = yield call(getIdentityEventsByID, endpoint, token, id, identity.effectiveChallenge);
    }
    return { identity, identityChallengeEvents };
}

function* resolveActionType(endpoint: string, config: InitConfig): Iterator<CallEffect | ModelChunk> {
    switch (config.type) {
        case ActionType.userIdentity:
            return yield call(resolveIdentity, endpoint, config);
    }
}

export type InitializeEffect = CallEffect | PutEffect<InitializeModelCompleted>;

export function* initializeModel(endpoint: string, config: InitConfig): Iterator<InitializeEffect> {
    const modelChunk = yield call(resolveActionType, endpoint, config);
    yield put({ type: TypeKeys.INITIALIZE_MODEL_COMPLETED, payload: modelChunk } as InitializeModelCompleted);
    return modelChunk;
}
