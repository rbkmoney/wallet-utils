import { IframeContainer } from './iframe-container';
import { PossibleEvents, Parent, Transport } from '../communication';
import { ActionType, Initializer } from './initializer';

export class IframeInitializer extends Initializer {

    private container: IframeContainer;

    constructor(protected accessToken: string, protected origin: string) {
        super(accessToken, origin);
        this.container = new IframeContainer(origin);
    }

    open(type: ActionType): Promise<Transport> {
        const target = (window.frames as any)[this.container.getName()];
        this.container.show();
        const parent = new Parent(target, this.origin);
        return new Promise((resolve, reject) => {
            parent.sendHandshake().then((transport) => {
                transport.emit(PossibleEvents.init, type);
                resolve(transport);
            });
        });

    }

    close(): void {
        this.container.reinitialize();
    }
}
