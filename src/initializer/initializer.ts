import mapValues from 'lodash-es/mapValues';
import isFunction from 'lodash-es/isFunction';

const mapBoolean = (obj: object): object => mapValues(obj, (value: any) => {
    switch (value) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return value;
    }
});

// const getLocale = (userConfig: any) => userConfig.locale || 'auto';
const getLocale = (userConfig: any) => 'auto';

const prepareConfig = (userConfig?: any): any => ({
    ...mapBoolean(userConfig),
    locale: getLocale(userConfig)
});

/* tslint:disable: no-empty */
const dummyFn: ActionCallback = () => {};

type ActionCallback = () => void;

const initCallback = (fn: any): ActionCallback => isFunction(fn) ? fn : dummyFn;

/* tslint:disable */
export abstract class Initializer {

    protected config: any;
    protected accessToken: string;
    protected origin: string;

    constructor(accessToken: string, origin: string, userConfig?: any) {
        this.config = prepareConfig ? prepareConfig(userConfig) : null;
        this.accessToken = accessToken;
        this.origin = origin;
    }

    abstract close(): void;
}
/* tslint:enable */
