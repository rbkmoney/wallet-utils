import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';

export const Gender: React.SFC = () => (
    <div className={formGroup}>
        <Input
            placeholder='Пол'
            mark={true}
            id='passport-gender-input'
        />
    </div>
);
