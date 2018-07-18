import { TokenizedCard } from './tokenized-card';

enum OutputStatusEnum {
    Unauthorized = 'Unauthorized',
    Authorized = 'Authorized'
}

export class Output {
    id: string;
    name: string;
    createdAt: string;
    isBlocked: boolean;
    identity: string;
    currency: string;
    resource: TokenizedCard;
    metadata: {};
    status: OutputStatusEnum;
    validUntil?: string;
}
