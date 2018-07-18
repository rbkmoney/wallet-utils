import * as isMobile from 'ismobilejs';
import isString from 'lodash-es/isString';
import isFunction from 'lodash-es/isFunction';
import { Initializer } from './initializer';
import { PopupInitializer } from './popup-initializer';
import { IframeInitializer } from './iframe-initializer';
import {
    CancelEvent,
    CreateOutputEvent,
    CreateOutputParams,
    IdentityChallengeEvent,
    StartIdentityChallengeParams,
    WalletUtilsEvent
} from './model';
import { getOrigin } from '../get-origin';
import { PossibleEvents, Transport } from '../communication';
import { ActionType, CreateOutputInitializerData, UserIdentityInitializerData } from '../communication/model';

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

const toOutputInitializerData = (token: string, params: CreateOutputParams): CreateOutputInitializerData => {
    if (!params) {
        throw new Error(`${logPrefix}: Missing CreateOutputParams`);
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
        type: ActionType.createOutput
    };
};

export class RbkmoneyWalletUtils {

    onCompleteIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onFailIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onCancelIdentityChallenge: (event: IdentityChallengeEvent) => void;
    onCreateOutput: (event: CreateOutputEvent) => void;
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
                transport.on(PossibleEvents.onCompleteIdentityChallenge, (e) =>
                    this.provideCallback(this.onCompleteIdentityChallenge, {
                        data: e.data
                    }));
                transport.on(PossibleEvents.onFailIdentityChallenge, (e) =>
                    this.provideCallback(this.onFailIdentityChallenge, {
                        data: e.data
                    }));
                transport.on(PossibleEvents.onCancelIdentityChallenge, (e) =>
                    this.provideCallback(this.onCancelIdentityChallenge, {
                        data: e.data
                    }));
                this.activateCancelEvent(transport);
                this.activateDoneEvent(transport);
            })
            .catch((e) => this.provideCallback(this.onCancel, { error: e }));
    }

    createOutput(params: CreateOutputParams): void {
        const data = toOutputInitializerData(this.token, params);
        this.initializer.open(data)
            .then((transport: Transport) => {
                transport.on(PossibleEvents.onCreateOutput, (e) =>
                    this.provideCallback(this.onCreateOutput, {
                        data: e.data
                    }));
                this.activateCancelEvent(transport);
                this.activateDoneEvent(transport);
            })
            .catch((e) => this.provideCallback(this.onCancel, { error: e }));
    }

    private activateCancelEvent(transport: Transport): void {
        transport.on(PossibleEvents.close, () => {
            this.initializer.close();
            this.provideCallback(this.onCancel, {});
        });
    }

    private activateDoneEvent(transport: Transport): void {
        transport.on(PossibleEvents.done, () => {
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
