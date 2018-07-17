export enum DestinationResourceEnum {
    BankCardDestinationResource = 'BankCardDestinationResource'
}

export class DestinationResource {
    type: DestinationResourceEnum;
    token: string;
}
