import { call, CallEffect, put } from 'redux-saga/effects';
import { ModalForms, ModalState, ModelState } from 'app/state';
import { ActionType, InitConfig } from 'app/config';
import { InitializeModalCompleted, TypeKeys } from 'app/actions';
import { PassportFormInfo, CardFormInfo } from 'app/state/modal';
import { initFromIdentityChallengeEvents } from './init-from-identity-challenge-events';

function* resolveActionType(config: InitConfig, model: ModelState): Iterator<CallEffect | ModalState> {
    switch (config.type) {
        case ActionType.userIdentity:
            if (model.identityChallengeEvents) {
                return yield call(initFromIdentityChallengeEvents, model.identityChallengeEvents);
            } else {
                return new ModalForms([new PassportFormInfo()], true);
            }

        case ActionType.createOutput:
            return new ModalForms([new CardFormInfo()], true);
    }
}

export function* initializeModal(config: InitConfig, model: ModelState): any {
    const initializedModals = yield call(resolveActionType, config, model);
    yield put({
        type: TypeKeys.INITIALIZE_MODAL_COMPLETED,
        payload: initializedModals
    } as InitializeModalCompleted);
}
