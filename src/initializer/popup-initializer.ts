import { Parent, Transport } from '../communication';
import { ActionType, Initializer } from './initializer';

const serialize = (params: any): string => {
    let urlParams = '';
    for (const prop in params) {
        if (params.hasOwnProperty(prop)) {
            const value = params[prop];
            if ((typeof value === 'function') || (value === undefined) || (value === null)) {
                continue;
            }
            if (urlParams !== '') {
                urlParams += '&';
            }
            urlParams += `${prop}=${encodeURIComponent(value)}`;
        }
    }
    return urlParams;
};

export class PopupInitializer extends Initializer {

    constructor(protected accessToken: string, protected origin: string) {
        super(accessToken, origin);
    }

    open(type: ActionType): Promise<Transport> {
        const url = `${this.origin}/v1/app.html?${serialize({type})}`;
        const target = window.open(url);
        const parent = new Parent(target, this.origin);
        return new Promise((resolve) => {
            parent.sendHandshake().then((transport) => {
                resolve(transport);
            });
        });
    }

    close(): void {}
}
