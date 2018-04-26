# wallet-utils

## API
### Type definition
```typescript
declare class RbkmoneyWalletUtils {

    constructor(token: string);

    startIdentityChallenge(params: StartIdentityChallengeParams): void;

    createOutput(params: CreateOutputParams): void;

    abort(): void;

    onCompleteIdentityChallenge(event: IdentityChallengeEvent) => void;

    onFailIdentityChallenge(event: IdentityChallengeEvent) => void;

    onCancelIdentityChallenge(event: IdentityChallengeEvent) => void;

    onCreateOutput(event: CreateOutputEvent) => void;

    onCancel(event: CancelEvent) => void;
}

declare interface StartIdentityChallengeParams {
    identityID: string;
    level?: IdentityLevel;
}

declare enum IdentityLevel {
    partial = 'partial'
}

declare interface CreateOutputParams {
    identityID: string;
    name: string;
}

declare interface WalletUtilsEvent {
    target: RbkmoneyWalletUtils;
}

declare interface IdentityChallengeEvent extends WalletUtilsEvent {
    identityChallenge: IdentityChallenge;
}

declare interface CreateOutputEvent extends WalletUtilsEvent {
    output: Output;
}

declare interface CancelEvent extends WalletUtilsEvent {
    type: CancelEventType;
}

declare enum CancelEventType {
    uiDismissing: 'uiDismissing',
    error: 'error'
}

declare interface ErrorCancelEvent extends CancelEvent {
    error: LogicError;
}

declare interface LogicError {
    code: string;
    message: string;
}

declare type IdentityChallenge = any; // see swagger definition

declare type Output = any; // see swagger definition
```

### Usage
```javascript
const walletUtils = new RbkmoneyWalletUtils('<jwt token>');

walletUtils.startIdentityChallenge({
    identityID: '<string>'
});

walletUtils.onCompleteIdentityChallenge = (event) => {
    // handle user complete identity challenge
};

walletUtils.onFailIdentityChallenge = (event) => {
    // handle user failed identity challenge
};

walletUtils.onCancel = (event) => {
    // handle UI dismissing
};
```
