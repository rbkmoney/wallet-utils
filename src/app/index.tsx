import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/main.scss';
import { Child } from '../communication';
import { App } from './components/app';
import { resolveConfig } from './config';
import { configureStore } from 'app/configure-store';
import { Provider } from 'react-redux';

const app = document.getElementById('app');

Child.resolve()
    .then((transport) => {
        resolveConfig(transport).then((config) => {
            const store = configureStore({config});
            ReactDOM.render(
                <Provider store={store}>
                    <App/>
                </Provider>,
                app
            );
        });
    });
