import { fetchWapi } from './fetch-wapi';
import v from './wapi-version';
import { DestinationResource } from 'app/backend';

export interface CardBindingParams {
    name: string;
    identity: string;
    currency: string;
    resource: DestinationResource;
    metadata: any;
}

export const bindCard = (wapiEndpoind: string, accessToken: string, bindParams: CardBindingParams) => fetchWapi({
    method: 'POST',
    endpoint: `${wapiEndpoind}/wallet/${v}/destinations`, accessToken,
    body: bindParams
});
