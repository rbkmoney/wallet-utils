import * as React from 'react';
import { layout } from './layout.scss';

import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';

export const App: React.SFC = () => (
    <div className={layout}>
        <Overlay/>
        <ModalContainer/>
    </div>
);
