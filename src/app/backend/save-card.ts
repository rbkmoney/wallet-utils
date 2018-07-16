import { fetchWapi } from './fetch-wapi';
import v from './wapi-version';

export class SaveCardParams {
    type: 'BankCard';
    cardNumber: string;
    expDate: string;
    cardHolder?: string;
    cvv?: string;
}

export const saveCard = (wapiEndpoint: string, accessToken: string, saveParams: SaveCardParams) =>
    fetchWapi({
        method: 'POST',
        endpoint: `${wapiEndpoint}/payres/${v}/bank-cards`,
        accessToken,
        body: saveParams
    });
