import { WalletUtilsEvent } from './wallet-utils-event';
import { IdentityChallenge } from './identity-challenge';

export interface IdentityChallengeEvent extends WalletUtilsEvent {
    identityChallenge: IdentityChallenge;
}
