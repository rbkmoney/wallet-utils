import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';

export const BirthDate: React.SFC = () => (
    <div className={formGroup}>
        <Input
            placeholder='Дата рождения'
            mark={true}
            id='passport-birthdate-input'
            type='date'
        />
    </div>
);
