import * as ReactDOM from 'react-dom';
import { Transport } from 'cross-origin-communicator';
import { PossibleEvents } from '../communication';
import { ResultState, State } from './state';

class AppFinalizer {

    constructor(private transport: Transport, private walletUtilsEl: HTMLElement) {
    }

    close() {
        ReactDOM.unmountComponentAtNode(this.walletUtilsEl);
        this.transport.emit(PossibleEvents.close);
        this.transport.destroy();
    }

    done(inFrame: boolean) {
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(this.walletUtilsEl);
            this.transport.emit(PossibleEvents.done);
            this.transport.destroy();
            if (inFrame) {
                window.close();
            }
        }, 5000);

    }
}

export function finalize(state: State, transport: Transport, walletUtilsEl: HTMLElement) {
    const finalizer = new AppFinalizer(transport, walletUtilsEl);
    switch (state.result) {
        case ResultState.close:
            transport.emit(PossibleEvents.onCancel);
            finalizer.close();
            break;
        case ResultState.identityChallengeCompleted:
            transport.emit(PossibleEvents.onCompleteIdentityChallenge, {data: state.model.identityChallenge});
            finalizer.done(state.config.inFrame);
            break;
        case ResultState.onCreateDestination:
            transport.emit(PossibleEvents.onCreateDestination, {data: state.model.destination});
            finalizer.done(state.config.inFrame);
            break;
        case ResultState.identityChallengeFailed:
            transport.emit(PossibleEvents.onFailIdentityChallenge, {data: state.error.error});
            break;
    }
}
