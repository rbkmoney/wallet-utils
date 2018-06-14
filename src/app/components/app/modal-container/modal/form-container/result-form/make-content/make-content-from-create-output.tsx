import * as React from 'react';
import { getSuccessDescription } from './get-success-description';
import { ResultFormContent } from './result-form-content';
import { Checkmark, Cross } from '../result-icons';
import { ActionType } from 'app/config';

const success = (): ResultFormContent => ({
    hasActions: false,
    hasDone: true,
    header: 'Успешная привязка',
    description: getSuccessDescription(ActionType.createOutput),
    icon: <Checkmark/>
});

const failed = (): ResultFormContent => ({
    hasActions: true,
    hasDone: false,
    header: 'Привязка карты не удалась',
    icon: <Cross/>
});

export const makeContentFromCreateOutput = () => {
    return success();
};
