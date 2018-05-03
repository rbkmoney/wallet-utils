import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './form-container.scss';
import { PassportForm } from './passport-form';

export const FormContainer: React.SFC = () => (
    <div className={styles.container}>
        <div
            className={cx(styles.form)}>
            <PassportForm />
        </div>
    </div>
);
