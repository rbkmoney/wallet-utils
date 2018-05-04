import * as React from 'react';
import * as cx from 'classnames';
import { container, form } from './form-container.scss';
import { PassportForm } from './passport-form';

export const FormContainer: React.SFC = () => (
    <div className={container}>
        <div
            className={cx(form)}>
            <PassportForm/>
        </div>
    </div>
);
