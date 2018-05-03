import * as React from 'react';
import * as styles from './layout.scss';

import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';

export const App: React.SFC = () => (
    <div className={styles.layout}>
        <Overlay/>
        <ModalContainer/>
    </div>
);
