import { IframeContainer } from './iframe-container';
import { PossibleEvents, Parent } from '../communication';
import { Initializer } from './initializer';

/* tslint:disable */
export class IframeInitializer extends Initializer {

    private container: IframeContainer;

    constructor(accessToken: string, origin: string, userConfig: any) {
        super(accessToken, origin, userConfig);
        this.container = new IframeContainer(origin);

        const target = (window.frames as any)[this.container.getName()];
        this.container.show();
        const parent = new Parent(target, this.origin);
        parent.sendHandshake().then((transport) => {
            transport.emit(PossibleEvents.init, this.config);
            transport.on(PossibleEvents.done, () => {
                this.close();
            });
            transport.on(PossibleEvents.close, () => {
                transport.destroy();
                this.close();
            });
        });
    }

    close() {
        this.container.reinitialize();
    }
}
/* tslint:enable */
