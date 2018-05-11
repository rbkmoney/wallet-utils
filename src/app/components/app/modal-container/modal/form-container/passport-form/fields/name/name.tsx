import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';

export const Name: React.SFC = () => (
    <div className={formGroup}>
        <Input
            placeholder='Имя'
            mark={true}
            id='passport-name-input'
        />
    </div>
);
