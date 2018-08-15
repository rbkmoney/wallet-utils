import * as isMobile from 'ismobilejs';
import isString from 'lodash-es/isString';
import isFunction from 'lodash-es/isFunction';
import { Transport } from 'cross-origin-communicator';
import { Initializer } from './initializer';
import { PopupInitializer } from './popup-initializer';
import { IframeInitializer } from './iframe-initializer';
import {
    CancelEvent,
    CreateDestinationEvent,
    CreateDestinationParams,
    IdentityChallengeEvent,
    StartIdentityChallengeParams,
    WalletUtilsEvent
} from './model';
import { getOrigin } from '../get-origin';
import { PossibleEvents } from '../communication';
import {
    ActionType,
    CreateDestinationInitializerData,
    UserIdentityInitializerData
} from '../communication/model';

const logPrefix = '[RBKmoney wallet utils]';

const origin = getOrigin();

const getInitializer = (accessToken: string): Initializer =>
    isMobile.any
        ? new PopupInitializer(accessToken, origin)
        : new IframeInitializer(accessToken, origin);

const toIdentityInitializerData = (token: string, params: StartIdentityChallengeParams): UserIdentityInitializerData => {
    if (!params) {
        throw new Error(`${logPrefix}: Missing StartIdentityChallengeParams`);
    }
    if (!isString(params.identityID)) {
        throw new Error(`${logPrefix}: Wrong identityID`);
    }
    return {
        token,
        params,
        type: ActionType.userIdentity
    };
};

const toDestinationInitializerData = (token: string, params: CreateDestinationParams): CreateDestinationInitializerData => {
    if (!params) {
        throw new Error(`${logPrefix}: Missing CreateDestinationParams`);
    }
    if (!isString(params.identityID)) {
        throw new Error(`${logPrefix}: Wrong identityID`);
    }
    if (!isString(params.name)) {
        throw new Error(`${logPrefix}: Wrong name`);
    }
    return {
        token,
        params,
        type: ActionType.createDestination
    };
};

export class RbkmoneyWalletUtils {

    onCompleteIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onFailIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onCancelIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onCreateDestination: (event: CreateDestinationEvent) => void;
    onCancel: (event: CancelEvent) => void;
    private initializer: Initializer;

    constructor(private readonly token: string) {
        if (!isString(token)) {
            throw new Error(`${logPrefix}: Wrong param token`);
        }
        this.token = token;
        this.initializer = getInitializer(token);
    }

    startIdentityChallenge(params: StartIdentityChallengeParams): void {
        const data = toIdentityInitializerData(this.token, params);
        this.initializer.open(data)
            .then((transport: Transport) => {
                transport.emit(PossibleEvents.init, data);
                transport.on(PossibleEvents.onCompleteIdentityChallenge, (eventData) =>
                    this.provideCallback(this.onCompleteIdentityChallenge, eventData));
                transport.on(PossibleEvents.onFailIdentityChallenge, (eventData) =>
                    this.provideCallback(this.onFailIdentityChallenge, eventData));
                transport.on(PossibleEvents.onCancelIdentityChallenge, (eventData) =>
                    this.provideCallback(this.onCancelIdentityChallenge, eventData));
                this.activateCancelEvent(transport);
                this.activateDoneEvent(transport);
            })
            .catch((e) => this.provideCallback(this.onCancel, {error: e}));
    }

    createDestination(params: CreateDestinationParams): void {
        const data = toDestinationInitializerData(this.token, params);
        this.initializer.open(data)
            .then((transport: Transport) => {
                transport.emit(PossibleEvents.init, data);
                transport.on(PossibleEvents.onCreateDestination, (eventData) => {
                    return this.provideCallback(this.onCreateDestination, eventData);
                });
                this.activateCancelEvent(transport);
                this.activateDoneEvent(transport);
            })
            .catch((e) => this.provideCallback(this.onCancel, {error: e}));
    }

    private activateCancelEvent(transport: Transport): void {
        transport.on(PossibleEvents.close, () => {
            transport.destroy();
            this.initializer.close();
            this.provideCallback(this.onCancel, {});
        });
    }

    private activateDoneEvent(transport: Transport): void {
        transport.on(PossibleEvents.done, () => {
            transport.destroy();
            this.initializer.close();
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
