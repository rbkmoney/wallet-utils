import { fetchWapi } from 'app/backend/fetch-wapi';
import v from './wapi-version';
import { SaveCardParams } from 'app/backend';

export const saveCard = (wapiEndpoint: string, accessToken: string, saveParams: SaveCardParams) =>
    fetchWapi({
        method: 'POST',
        endpoint: `${wapiEndpoint}/payres/${v}/bank-cards`,
        accessToken,
        body: saveParams
    });
