import { IframeContainer } from './iframe-container';
import { Parent, PossibleEvents, Transport } from '../communication';
import { Initializer } from './initializer';
import { InitializerData } from '../communication/model';

export class IframeInitializer extends Initializer {

    private container: IframeContainer;

    constructor(protected accessToken: string, protected origin: string) {
        super(accessToken, origin);
        this.container = new IframeContainer(origin);
    }

    open(data: InitializerData): Promise<Transport> {
        const target = (window.frames as any)[this.container.getName()];
        this.container.show();
        const parent = new Parent(target, this.origin);
        return new Promise((resolve) => {
            return parent.sendHandshake().then((transport) => {
                transport.emit(PossibleEvents.init, data);
                resolve(transport);
            });
        });

    }

    close(): void {
        this.container.reinitialize();
    }
}
