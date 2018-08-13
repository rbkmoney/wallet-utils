import { Transport } from 'cross-origin-communicator';
import { Initializer } from './initializer';
import { InitializerData } from '../communication/model';
import isObject from 'lodash-es/isObject';
import { initialize } from 'cross-origin-communicator';
import { communicatorInstanceName } from '../communicator-constants';

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
        return initialize(target, this.origin, communicatorInstanceName);
    }

    close(): void {
    }
}
