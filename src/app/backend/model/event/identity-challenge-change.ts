export enum IdentityChallengeStatus {
    Pending = 'Pending',
    Completed = 'Completed',
    Failed = 'Failed',
    Cancelled = 'Cancelled'
}

export enum IdentityChallengeEventType {
    IdentityChallengeStatusChanged = 'IdentityChallengeStatusChanged'
}

export class IdentityChallengeChange {
    type: IdentityChallengeEventType;
    status: IdentityChallengeStatus;
    validUntil?: string;
    failureReason?: string;
}
