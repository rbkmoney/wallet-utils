import { IdentityChallengeEventChange } from './identity-challenge-event-change';

export class IdentityChallengeEvent {
    eventID: number;
    occuredAt: string;
    changes: IdentityChallengeEventChange[];
}
