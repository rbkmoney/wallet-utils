import { Identity, Event, TokenizedCard, TokenizedInsurance, TokenizedPassport } from 'app/backend';

export class ModelState {
    identity?: Identity;
    identityChallengeEvents?: Event[];
    tokenizedInsurance?: TokenizedInsurance;
    tokenizedPassport?: TokenizedPassport;
    tokenizedCard?: TokenizedCard;
}
