import { Identity } from 'app/backend/model/identity';
import { fetchWapi } from 'app/backend/fetch-wapi';

export const getIdentityByID = (wapiEndpoint: string, accessToken: string, identityID: string): Promise<Identity> =>
    fetchWapi({
        endpoint: `${wapiEndpoint}/identities/${identityID}`,
        accessToken
    });
