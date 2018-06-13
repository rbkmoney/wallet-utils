import * as React from 'react';
import { text } from '../result-form.scss';

export const getSuccessDescription = (): JSX.Element => (
    <p className={text}>
        Идентификация прошла успешно.
    </p>
);
