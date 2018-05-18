import { Identity, fetchWapi } from 'app/backend';

export const getIdentityByID = (wapiEndpoint: string, accessToken: string, identityID: string): Promise<Identity> =>
    fetchWapi({
        endpoint: `${wapiEndpoint}/identities/${identityID}`,
        accessToken
    });
