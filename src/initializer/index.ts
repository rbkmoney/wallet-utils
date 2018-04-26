import * as isMobile from 'ismobilejs';
import isFunction from 'lodash-es/isFunction';
import { Initializer } from './initializer';
import { PopupInitializer } from './popup-initializer';
import { IframeInitializer } from './iframe-initializer';
import { StartIdentityChallengeParams } from './model/start-identity-challenge-params';
import { getOrigin } from '../get-origin';
import { PossibleEvents } from '../communication';
import { CancelEvent } from './model/cancel-event';
import { IdentityChallengeEvent } from './model/identity-challenge-event';
import { WalletUtilsEvent } from './model/wallet-utils-event';
import { ActionType, Transport } from '../communication/model';
import { CreateOutputEvent, CreateOutputParams } from './model';

const origin = getOrigin();

const getInitializer = (accessToken: string): Initializer =>
    isMobile.any
        ? new PopupInitializer(accessToken, origin)
        : new IframeInitializer(accessToken, origin);

export class RbkmoneyWalletUtils {

    onCompleteIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onFailIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onCancelIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onCreateOutput: (event: CreateOutputEvent) => void;
    onCancel: (event: CancelEvent) => void;
    private initializer: Initializer;

    constructor(private readonly token: string) {
        this.token = token;
        this.initializer = getInitializer(token);
    }

    startIdentityChallenge(params: StartIdentityChallengeParams): void {
        this.initializer.open({type: ActionType.userIdentity, token: this.token})
            .then((transport: Transport) => {
                transport.on(PossibleEvents.onCompleteIdentityChallenge, (e) => {
                    this.provideCallback(this.onCompleteIdentityChallenge, {
                        data: e.data
                    });
                });
                transport.on(PossibleEvents.onFailIdentityChallenge, (e) => {
                    this.provideCallback(this.onFailIdentityChallenge, {
                        data: e.data
                    });
                });
                transport.on(PossibleEvents.onCancelIdentityChallenge, (e) => {
                    this.provideCallback(this.onCancelIdentityChallenge, {
                        data: e.data
                    });
                });
                transport.on(PossibleEvents.onCancel, () => {
                    this.provideCallback(this.onCancel, {});
                });
            }).catch((e) => {
            throw new Error(e);
        });
    }

    createOutput(params: CreateOutputParams): void {
        this.initializer.open({type: ActionType.createOutput, token: this.token})
            .then((transport: Transport) => {
                transport.on(PossibleEvents.onCreateOutput, (e) => {
                    this.provideCallback(this.onCreateOutput, {
                        data: e.data
                    });
                });
            }).catch((e) => {
            throw new Error(e);
        });
    }

    private provideCallback(callback: (data: WalletUtilsEvent) => void, data: any): void {
        if (isFunction(callback)) {
            callback({
                target: this,
                ...data
            });
        }
    }
}

/* tslint:disable */
(window as any).RbkmoneyWalletUtils = RbkmoneyWalletUtils;
/* tslint:enable */
