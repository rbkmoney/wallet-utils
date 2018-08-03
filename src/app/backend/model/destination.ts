import { TokenizedCard } from './tokenized-card';

enum DestinationStatusEnum {
    Unauthorized = 'Unauthorized',
    Authorized = 'Authorized'
}

export class Destination {
    id: string;
    name: string;
    createdAt: string;
    isBlocked: boolean;
    identity: string;
    currency: string;
    resource: TokenizedCard;
    metadata: {};
    status: DestinationStatusEnum;
    validUntil?: string;
}
