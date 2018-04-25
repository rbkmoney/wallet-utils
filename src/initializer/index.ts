import * as isMobile from 'ismobilejs';
import { Initializer } from './initializer';
import { PopupInitializer } from './popup-initializer';
import { IframeInitializer } from './iframe-initializer';
import { StartIdentityChallengeParams } from './start-identity-challenge-params';
import { domReady } from './dom-ready';

/* tslint:disable */
domReady().then((origin) => {

    interface InitializedWindow extends Window {
        RbkmoneyWallet: RbkmoneyWalletUtils;
    }

    const getFrame = (accessToken: string, origin: string, userConfig?: any): Initializer =>
        isMobile.any
            ? new PopupInitializer(accessToken, origin, userConfig)
            : new IframeInitializer(accessToken, origin, userConfig);

    class RbkmoneyWalletUtils {

        readonly token: string;
        readonly userConfig: any;
        readonly origin: string = origin;

        constructor(token: string, userConfig?: any) {
            this.token = token;
            this.userConfig = userConfig;
        };

        startIdentityChallenge(params: StartIdentityChallengeParams): void {
            getFrame(this.token, this.origin, this.userConfig);
        }
    }

    const RbkmoneyWallet = (window as InitializedWindow).RbkmoneyWallet = RbkmoneyWalletUtils;
});

/* tslint:enable */
