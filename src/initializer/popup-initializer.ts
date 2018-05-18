import { Parent, Transport } from '../communication';
import { Initializer } from './initializer';
import { InitializerData } from '../communication/model';
import isObject from 'lodash-es/isObject';

const serialize = (params: any): string => {
    let urlParams = '';
    for (const prop in params) {
        if (params.hasOwnProperty(prop)) {
            let value = params[prop];
            if ((typeof value === 'function') || (value === undefined) || (value === null)) {
                continue;
            }
            if (isObject(value)) {
                value = JSON.stringify(value);
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

    open(data: InitializerData): Promise<Transport> {
        const url = `${this.origin}/v1/app.html?${serialize(data)}`;
        const target = window.open(url);
        const parent = new Parent(target, this.origin);
        return new Promise((resolve) => {
            return parent.sendHandshake().then((transport) => {
                resolve(transport);
            });
        });
    }

    close(): void {}
}
