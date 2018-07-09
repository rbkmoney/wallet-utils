import { Identity, fetchWapi } from 'app/backend';
import v from './wapi-version';

export const getIdentityByID = (wapiEndpoint: string, accessToken: string, identityID: string): Promise<Identity> =>
    fetchWapi({
        endpoint: `${wapiEndpoint}/wallet/${v}/identities/${identityID}`,
        accessToken
    });
