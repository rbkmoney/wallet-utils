import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';

export const PassportNumber: React.SFC = () => (
    <div className={formGroup}>
        <Input
            placeholder='Серия и номер'
            mark={true}
            id='passport-number-input'
        />
    </div>
);
