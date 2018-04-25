import { PossibleEvents } from '.';

/* tslint:disable */
export interface Transport {
    emit(name: PossibleEvents, data?: any): void;

    on(eventName: PossibleEvents, callback: (data: any) => any): void;

    destroy(): void;
}
/* tslint:enable */
