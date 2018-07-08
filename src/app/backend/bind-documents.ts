import { fetchWapi } from './fetch-wapi';
import v from './wapi-version';

export const bindDocuments = (wapiEndpoind: string, accessToken: string, identityID: string, bindParams: any) => fetchWapi({
    method: 'POST',
    endpoint: `${wapiEndpoind}/wallet/${v}/identities/${identityID}/challenges`, accessToken,
    body: bindParams
});
