declare enum IdentityLevel {
    partial = 'partial'
}

export interface StartIdentityChallengeParams {
    readonly identityID: string;
    readonly level?: IdentityLevel;
}
