import { PossibleEvents, Transport, TransportInfo, TransportMessage } from '.';

export class RealTransport implements Transport {

    private target: Window;
    private origin: string;
    private events: any = {};

    constructor(target: Window, origin: string, source: Window) {
        this.target = target;
        this.origin = origin;
        source.addEventListener('message', this.listener.bind(this), false);
    }

    emit(name: PossibleEvents, data?: any): void {
        const serialized = JSON.stringify({
            data,
            name,
            transport: TransportInfo.transportName
        } as TransportMessage);
        this.target.postMessage(serialized, this.origin);
    }

    on(eventName: PossibleEvents, callback: (data: any) => any): void {
        this.events[eventName] = callback;
    }

    destroy(): void {
        window.removeEventListener('message', this.listener.bind(this), false);
    }

    private listener(e: MessageEvent): void {
        let parsed: TransportMessage;
        try {
            parsed = JSON.parse(e.data);
        /* tslint:disable:no-empty */
        } catch (e) {}
        if (parsed && (parsed.name in this.events)) {
            if (parsed.transport === TransportInfo.transportName) {
                this.events[parsed.name].call(this, parsed.data);
            }
        }
    }
}