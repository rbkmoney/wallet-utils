export class SaveCardParams {
    type: 'BankCard';
    cardNumber: string;
    expDate: string;
    cardHolder?: string;
    cvv?: string;
}
