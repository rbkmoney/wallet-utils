import { Transport } from 'cross-origin-communicator';
import { IframeContainer } from './iframe-container';
import { Initializer } from './initializer';
import { initialize } from 'cross-origin-communicator';
import { communicatorInstanceName } from '../communicator-constants';

export class IframeInitializer extends Initializer {

    private container: IframeContainer;

    constructor(protected accessToken: string, protected origin: string) {
        super(accessToken, origin);
        this.container = new IframeContainer(origin);
    }

    open(): Promise<Transport> {
        const target = (window.frames as any)[this.container.getName()];
        this.container.show();
        return initialize(target, this.origin, communicatorInstanceName);
    }

    close(): void {
        this.container.reinitialize();
    }
}
