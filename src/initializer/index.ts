import * as isMobile from 'ismobilejs';
import isFunction from 'lodash-es/isFunction';
import { ActionType, Initializer } from './initializer';
import { PopupInitializer } from './popup-initializer';
import { IframeInitializer } from './iframe-initializer';
import { StartIdentityChallengeParams } from './start-identity-challenge-params';
import { getOrigin } from '../get-origin';
import { PossibleEvents } from '../communication';
import { CancelEvent, CancelEventType } from './cancel-event';
import { IdentityChallengeEvent } from './identity-challenge-event';

const origin = getOrigin();

const getInitializer = (accessToken: string): Initializer =>
    isMobile.any
        ? new PopupInitializer(accessToken, origin)
        : new IframeInitializer(accessToken, origin);

export class RbkmoneyWalletUtils {

    onCompleteIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onFailIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onCancel: (event: CancelEvent) => void;
    private initializer: Initializer;

    constructor(private readonly token: string) {
        this.token = token;
        this.initializer = getInitializer(token);
    }

    startIdentityChallenge(params: StartIdentityChallengeParams): void {
        this.initializer.open(ActionType.userIdentity)
            .then((transport) => {
                transport.on(PossibleEvents.doneIdentityChallenge, (e) => {
                    if (isFunction(this.onCompleteIdentityChallenge)) {
                        this.onCompleteIdentityChallenge({
                            target: this,
                            identityChallenge: e.data
                        });
                    }
                });
                transport.on(PossibleEvents.failIdentityChallenge, (e) => {
                    if (isFunction(this.onFailIdentityChallenge)) {
                        this.onFailIdentityChallenge({
                            target: this,
                            identityChallenge: e.data
                        });
                    }
                });
                transport.on(PossibleEvents.cancel, () => {
                    if (isFunction(this.onCancel)) {
                        this.onCancel({
                            target: this,
                            type: CancelEventType.cancel
                        });
                    }
                });
            });
    }
}

/* tslint:disable */
(window as any).RbkmoneyWalletUtils = RbkmoneyWalletUtils;
/* tslint:enable */
