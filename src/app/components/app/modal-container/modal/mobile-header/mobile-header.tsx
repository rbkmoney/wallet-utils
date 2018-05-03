import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './mobile-header.scss';

export const MobileHeader: React.SFC = () => (
    <header className={styles.header}>
        <div className={cx(styles.text, {[styles._center]: true})}>
            [props.initConfig.name]
        </div>
    </header>
);
