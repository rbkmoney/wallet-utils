import { Event, IdentityChallengeChange, IdentityChallengeEventType, IdentityChallengeStatus } from 'app/backend';
import { getLastChange } from 'app/utils/event-utils';
import { ModalState } from 'app/state';
import { toModalResult } from './to-modal-result';

const initFormPaymentStatusChanged = (change: IdentityChallengeChange): ModalState => {
    switch (change.status) {
        case IdentityChallengeStatus.Cancelled:
        case IdentityChallengeStatus.Completed:
        case IdentityChallengeStatus.Failed:
            return toModalResult();
    }
};

export const initFromIdentityChallengeEvents = (events: Event[]): ModalState => {
    const change = getLastChange(events);
    switch (change.type) {
        case IdentityChallengeEventType.IdentityChallengeStatusChanged:
            return initFormPaymentStatusChanged(change as IdentityChallengeChange);
    }
};
