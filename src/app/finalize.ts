import * as ReactDOM from 'react-dom';
import { Transport, PossibleEvents } from '../communication';
import { ResultState, State } from './state';

class AppFinalizer {

    constructor(private transport: Transport, private walletUtilsEl: HTMLElement) {
    }

    close() {
        ReactDOM.unmountComponentAtNode(this.walletUtilsEl);
        this.transport.emit(PossibleEvents.close);
        this.transport.destroy();
    }
}

export function finalize(state: State, transport: Transport, walletUtilsEl: HTMLElement) {
    const finalizer = new AppFinalizer(transport, walletUtilsEl);
    switch (state.result) {
        case ResultState.close:
            finalizer.close();
            break;
    }
}
