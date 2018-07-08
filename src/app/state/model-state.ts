import { Identity, TokenizedCard, TokenizedInsurance, TokenizedPassport } from 'app/backend';

export class ModelState {
    identity?: Identity;
    tokenizedInsurance?: TokenizedInsurance;
    tokenizedPassport?: TokenizedPassport;
    tokenizedCard?: TokenizedCard;
}
