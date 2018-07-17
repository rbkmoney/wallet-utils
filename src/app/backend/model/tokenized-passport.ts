import { Document } from './document';

export class TokenizedPassport extends Document {
    seriesMasked: string;
    numberMasked: string;
    fullnameMasked: string;
}
