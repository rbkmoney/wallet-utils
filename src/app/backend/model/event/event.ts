import { IdentityChallengeChange } from './identity-challenge-change';

export class Event {
    eventID: number;
    occuredAt: string;
    changes: IdentityChallengeChange[];
}
