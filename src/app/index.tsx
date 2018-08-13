import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Transport } from 'cross-origin-communicator';

import './styles/main.scss';
import { App } from './components/app';
import { configureStore } from './configure-store';
import { Provider } from 'react-redux';
import { finalize } from './finalize';
import { initialize } from './initialize';

let isFinalized = false;

initialize().then((res) => {
    const [transport, config] = res;
    const app = document.getElementById('app');
    const store = configureStore({config});
    store.subscribe(() => {
        const state = store.getState();
        if (state.result && !isFinalized) {
            finalize(state, transport as Transport, app);
            isFinalized = true;
        }
    });
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        app
    );
});
