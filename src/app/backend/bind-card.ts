import { fetchWapi } from './fetch-wapi';
import v from './wapi-version';

export const bindCard = (wapiEndpoind: string, accessToken: string, bindParams: any) => fetchWapi({
    method: 'POST',
    endpoint: `${wapiEndpoind}/wallet/${v}/destinations`, accessToken,
    body: bindParams
});
