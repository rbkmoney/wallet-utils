import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';

export const Patronymic: React.SFC = () => (
    <div className={formGroup}>
        <Input
            placeholder='Отчество'
            mark={true}
            id='passport-patronymic-input'
        />
    </div>
);
