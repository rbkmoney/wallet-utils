import { CallEffect, put, PutEffect } from 'redux-saga/effects';
import { Event } from 'app/backend';
import { ModalForms, ModalState, ModelState } from 'app/state';
import { ActionType, InitConfig } from 'app/config';
import { InitializeModalCompleted, TypeKeys } from 'app/actions';
import { CardFormInfo, PassportFormInfo } from 'app/state/modal';
import { initFromIdentityChallengeEvents } from './init-from-identity-challenge-events';

type InitializeAppEffect =
    CallEffect |
    PutEffect<InitializeModalCompleted>;

const resolveActionType = (config: InitConfig, identityChallengeEvents?: Event[]): ModalState => {
    switch (config.type) {
        case ActionType.userIdentity:
            if (identityChallengeEvents) {
                return initFromIdentityChallengeEvents(identityChallengeEvents);
            } else {
                return new ModalForms([new PassportFormInfo()], true);
            }

        case ActionType.createOutput:
            return new ModalForms([new CardFormInfo()], true);
    }
};

export function* initializeModal(config: InitConfig, model?: ModelState): Iterator<InitializeAppEffect> {
    const initializedModals = resolveActionType(config, model ? model.identityChallengeEvents : null);
    yield put({
        type: TypeKeys.INITIALIZE_MODAL_COMPLETED,
        payload: initializedModals
    } as InitializeModalCompleted);
}
