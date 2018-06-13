import * as React from 'react';
import { text } from '../result-form.scss';
import { LogicError } from 'app/backend';

const getDescription = (e: LogicError): string => {
    let result: string;
    result = e.name ? e.name : null;
    result = e.description ? `${result}: ${e.description}` : result;
    result = result.length > 0 ? result : e.errorType;
    return result;
};

export const getFailedDescription = (e: LogicError): JSX.Element => {
    if (!e && !e.errorType) {
        return;
    }
    return <p className={text}>{getDescription(e)}</p>;
};
