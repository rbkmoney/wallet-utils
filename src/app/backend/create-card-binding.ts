import { fetchWapi } from 'app/backend/fetch-wapi';
import v from './wapi-version';
import { CardBindingParams } from 'app/backend';

export const createCardBinding = (wapiEndpoint: string, accessToken: string, bindingParams: CardBindingParams) =>
    fetchWapi({
        method: 'POST',
        endpoint: `${wapiEndpoint}/payres/${v}/bank-cards`,
        accessToken,
        body: bindingParams
    });
