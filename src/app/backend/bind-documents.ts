import { fetchWapi } from './fetch-wapi';
import v from './wapi-version';

export class TokenizedProofs {
    token: string;
}

export interface DocumentsBindingParams {
    type: string;
    proofs: TokenizedProofs[];
}

export const bindDocuments = (wapiEndpoind: string, accessToken: string, identityID: string, bindParams: DocumentsBindingParams) => fetchWapi({
    method: 'POST',
    endpoint: `${wapiEndpoind}/wallet/${v}/identities/${identityID}/challenges`, accessToken,
    body: bindParams
});
