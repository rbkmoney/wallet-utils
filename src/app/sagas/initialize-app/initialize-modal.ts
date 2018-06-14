import { call, CallEffect, put } from 'redux-saga/effects';
import { ModalForms, ModalState } from 'app/state';
import { ActionType, InitConfig } from 'app/config';
import { InitializeModalCompleted, TypeKeys } from 'app/actions';
import { PassportFormInfo, CardFormInfo } from 'app/state/modal';

function* resolveActionType(config: InitConfig): Iterator<CallEffect | ModalState> {
    switch (config.type) {
        case ActionType.userIdentity:
            return new ModalForms([new PassportFormInfo()], true);
        case ActionType.createOutput:
            return new ModalForms([new CardFormInfo()], true);
    }
}

export function* initializeModal(config: InitConfig): any {
    const initializedModals = yield call(resolveActionType, config);
    yield put({
        type: TypeKeys.INITIALIZE_MODAL_COMPLETED,
        payload: initializedModals
    } as InitializeModalCompleted);
}
