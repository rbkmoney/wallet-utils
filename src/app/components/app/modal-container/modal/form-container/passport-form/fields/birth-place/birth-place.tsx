import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';

export const BirthPlace: React.SFC = () => (
    <div className={formGroup}>
        <Input
            placeholder='Место рождения'
            mark={true}
            id='passport-birthplace-input'
        />
    </div>
);
