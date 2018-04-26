import { Transport, PossibleEvents } from '.';

export class StubTransport implements Transport {

    emit(name: PossibleEvents, data: any): void {
        console.info('transport stub emit: ', name, data);
    }

    on(eventName: PossibleEvents, callback: (data: any) => any): void {
        callback({});
        console.info('transport stub on: ', eventName, callback);
    }

    destroy(): void {
        console.info('transport stub destroy');
    }
}
