import { Output, WalletUtilsEvent } from '.';

export interface CreateOutputEvent extends WalletUtilsEvent {
    output: Output;
}
