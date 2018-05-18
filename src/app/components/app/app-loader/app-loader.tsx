import * as React from 'react';
import * as styles from './app-loader.scss';
import { Loader } from '../../ui/loader';

const AppLoaderDef: React.SFC = () => (
    <div className={styles.loader}>
        <Loader/>
    </div>
);

export const AppLoader = AppLoaderDef;
