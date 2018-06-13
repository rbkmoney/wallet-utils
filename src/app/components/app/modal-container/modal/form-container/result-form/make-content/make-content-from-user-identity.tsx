import * as React from 'react';
import { getSuccessDescription } from './get-success-description';
import { ResultFormContent } from './result-form-content';
import { Checkmark, Cross } from '../result-icons';

const success = (): ResultFormContent => ({
    hasActions: false,
    hasDone: true,
    header: 'Успешная идентификация',
    description: getSuccessDescription(),
    icon: <Checkmark/>
});

const failed = (): ResultFormContent => ({
    hasActions: true,
    hasDone: false,
    header: 'Идентификация не удалась',
    icon: <Cross/>
});

export const makeContentFromUserIdentity = () => {
    return success();
};
