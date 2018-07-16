export enum IdentityChallengeStatus {
    Pending = 'Pending',
    Completed = 'Completed',
    Failed = 'Failed',
    Cancelled = 'Cancelled'
}

export enum IdentityChallengeEventType {
    IdentityChallengeStatusChanged = 'IdentityChallengeStatusChanged'
}

export class IdentityChallengeEventChange {
    type: IdentityChallengeEventType;
    status: IdentityChallengeStatus;
    validUntil?: string;
    failureReason?: string;
}
