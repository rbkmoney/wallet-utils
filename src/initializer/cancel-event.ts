import { WalletUtilsEvent } from './wallet-utils-event';

export interface CancelEvent extends WalletUtilsEvent {
    type: CancelEventType;
}

export enum CancelEventType {
    cancel
}
