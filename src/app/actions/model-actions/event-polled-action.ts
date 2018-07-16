import { AbstractAction, TypeKeys } from 'app/actions';
import { IdentityChallengeEvent } from 'app/backend';

export interface EventPolled extends AbstractAction<IdentityChallengeEvent[]> {
    type: TypeKeys.EVENTS_POLLED;
    payload: IdentityChallengeEvent[];
}
