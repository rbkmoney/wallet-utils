import * as React from 'react';
import { getSuccessDescription } from './get-success-description';
import { ResultFormContent } from './result-form-content';
import { Checkmark, Cross } from '../result-icons';
import { ActionType } from 'app/config';
import { ErrorState } from 'app/state';
import { text } from 'app/components/app/modal-container/modal/form-container/result-form/result-form.scss';

const success = (): ResultFormContent => ({
    hasActions: false,
    hasDone: true,
    header: 'Успешная идентификация',
    description: getSuccessDescription(ActionType.userIdentity),
    icon: <Checkmark/>
});

const failed = (msg: string): ResultFormContent => ({
    hasActions: true,
    hasDone: false,
    header: 'Идентификация не удалась',
    description: <p className={text}>{msg}</p>,
    icon: <Cross/>
});

export const makeContentFromUserIdentity = (error: ErrorState) => {
    return error ? failed(error.error.message) : success();
};
