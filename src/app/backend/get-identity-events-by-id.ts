import { fetchWapi, IdentityChallengeEvent } from 'app/backend';
import v from './wapi-version';

export const getIdentityEventsByID = (wapiEndpoint: string, accessToken: string, identityID: string, challengeID: string, limit: number = 50): Promise<IdentityChallengeEvent[]> =>
    fetchWapi({
        endpoint: `${wapiEndpoint}/wallet/${v}/identities/${identityID}/challenges/${challengeID}/events?limit=${limit}`,
        accessToken
    });
