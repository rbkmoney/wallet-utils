import { PossibleEvents, Parent } from '../communication';
import { Initializer } from './initializer';

/* tslint:disable */
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

    constructor(accessToken: string, origin: string, userConfig: any) {
        super(accessToken, origin, userConfig);
        const url = `${this.origin}/v1/app.html?${serialize(this.config)}`;
        const target = window.open(url);
        const parent = new Parent(target, this.origin);
        parent.sendHandshake().then((transport) => {
            transport.on(PossibleEvents.done, () => {
                this.close();
            });
            transport.on(PossibleEvents.close, () => {
                transport.destroy();
                this.close();
            });
        });
    }

    open() {

    }

    close() {
    }
}

/* tslint:enable */
