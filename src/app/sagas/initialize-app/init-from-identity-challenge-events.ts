import {
    IdentityChallengeEvent,
    IdentityChallengeEventChange,
    IdentityChallengeEventType,
    IdentityChallengeStatus
} from 'app/backend';
import { getLastChange } from 'app/utils/event-utils';
import { ModalState } from 'app/state';
import { toModalResult } from './to-modal-result';

const initFormPaymentStatusChanged = (change: IdentityChallengeEventChange): ModalState => {
    switch (change.status) {
        case IdentityChallengeStatus.Cancelled:
        case IdentityChallengeStatus.Completed:
        case IdentityChallengeStatus.Failed:
            return toModalResult();
    }
};

export const initFromIdentityChallengeEvents = (events: IdentityChallengeEvent[]): ModalState => {
    const change = getLastChange(events);
    switch (change.type) {
        case IdentityChallengeEventType.IdentityChallengeStatusChanged:
            return initFormPaymentStatusChanged(change as IdentityChallengeEventChange);
    }
};
