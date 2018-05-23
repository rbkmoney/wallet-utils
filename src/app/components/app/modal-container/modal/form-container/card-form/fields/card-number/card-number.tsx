import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';
import { cardNumberInput, inputContainer } from './card-number.scss';
import { IconType } from 'app/components/ui';

import { CardTypeIcon } from '..';

export const CardNumber: React.SFC = () => (
    <div className={formGroup}>
        <div className={inputContainer}>
            <Input
                className={cardNumberInput}
                icon={IconType.card}
                id='card-number-input'
                placeholder='Номер карты'/>
            <CardTypeIcon cardNumber='4242 4242 4242 4242'/>
        </div>
    </div>
);
