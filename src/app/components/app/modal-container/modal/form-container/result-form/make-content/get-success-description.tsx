import * as React from 'react';
import { text } from '../result-form.scss';
import { ActionType } from 'app/config';

const getDescription = (type: ActionType): string => {
    switch (type) {
        case ActionType.userIdentity:
            return 'Идентификация прошла успешно.';
        case ActionType.createDestination:
            return 'Привязка карты вывода прошла успешно.';
    }
};

export const getSuccessDescription = (type: ActionType): JSX.Element => (
    <p className={text}>
        {getDescription(type)}
    </p>
);
