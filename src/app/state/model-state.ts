import { Identity, IdentityChallengeEvent, TokenizedCard, TokenizedInsurance, TokenizedPassport } from 'app/backend';

export class ModelState {
    identity?: Identity;
    identityChallengeEvents?: IdentityChallengeEvent[];
    tokenizedInsurance?: TokenizedInsurance;
    tokenizedPassport?: TokenizedPassport;
    tokenizedCard?: TokenizedCard;
}
