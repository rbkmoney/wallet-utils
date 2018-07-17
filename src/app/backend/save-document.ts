import { fetchWapi } from './fetch-wapi';
import v from './wapi-version';

export const saveDocument = (wapiEndpoind: string, accessToken: string, saveParams: any) => fetchWapi({
    method: 'POST',
    endpoint: `${wapiEndpoind}/privdoc/${v}/private-documents`, accessToken,
    body: saveParams
});
