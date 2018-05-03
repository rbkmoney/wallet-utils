import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/main.scss';
import { Child } from '../communication';
import { App } from './components/app';

const app = document.getElementById('app');

Child.resolve()
    .then(() => {
        ReactDOM.render(
            <App />,
            app
        );
    });
