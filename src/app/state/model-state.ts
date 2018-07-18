import { Identity, Event, TokenizedCard, TokenizedInsurance, TokenizedPassport, Output } from 'app/backend';

export class ModelState {
    identity?: Identity;
    identityChallengeEvents?: Event[];
    tokenizedInsurance?: TokenizedInsurance;
    tokenizedPassport?: TokenizedPassport;
    tokenizedCard?: TokenizedCard;
    output?: Output;
    identityChallenge?: any;
}
