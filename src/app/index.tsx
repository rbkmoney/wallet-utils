import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Child } from '../communication';
import './styles/main.scss';

const app = document.getElementById('app');

Child.resolve()
    .then((transport) => {
        /* tslint:disable:no-expression-statement */
        ReactDOM.render(
            <div>start</div>,
            app
        );
        /* tslint:enable:no-expression-statement */
    });
