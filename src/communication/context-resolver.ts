/* tslint:disable */
export class ContextResolver {

    static set(context: any) {
        try {
            sessionStorage.setItem(this.key, JSON.stringify(context));
        } catch (e) {}
    }

    static get(): any {
        try {
            return JSON.parse(sessionStorage.getItem(this.key));
        } catch (e) {}
    }

    static isAvailable(): boolean {
        try {
            return !!JSON.parse(sessionStorage.getItem(this.key));
        } catch (e) {}
    }

    private static key = 'checkout-context';
}
/* tslint:enable */
