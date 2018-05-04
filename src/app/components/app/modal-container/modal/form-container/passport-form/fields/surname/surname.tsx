import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';

export const Surname: React.SFC = () => (
    <div className={formGroup}>
        <Input
            placeholder='Фамилия'
            mark={true}
            id='passport-surname-input'
        />
    </div>
);
