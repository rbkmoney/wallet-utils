import { Destination, WalletUtilsEvent } from '.';

export interface CreateDestinationEvent extends WalletUtilsEvent {
    destination: Destination;
}
