import { put, PutEffect } from 'redux-saga/effects';
import { last } from 'lodash-es';
import { Direction, GoToFormInfo, SetModalState, SetViewInfoProcess, TypeKeys } from 'app/actions';
import { Event, IdentityChallengeStatus } from 'app/backend';
import { ResultFormInfo } from 'app/state';

type SetStateFromEvents = GoToFormInfo | SetModalState | SetViewInfoProcess;

const toPayload = (event: Event): SetStateFromEvents => {
    const change = last(event.changes);
    switch (change.status) {
        case IdentityChallengeStatus.Cancelled:
        case IdentityChallengeStatus.Completed:
        case IdentityChallengeStatus.Failed:
            return {
                type: TypeKeys.GO_TO_FORM_INFO,
                payload: {
                    formInfo: new ResultFormInfo(),
                    direction: Direction.forward
                }
            };
    }
};

export function* provideFromIdentityChallengeEvent(event: Event): Iterator<PutEffect<SetStateFromEvents>> {
    yield put({
        type: TypeKeys.SET_VIEW_INFO_PROCESS,
        payload: false
    } as SetViewInfoProcess);
    return yield put(toPayload(event));
}
