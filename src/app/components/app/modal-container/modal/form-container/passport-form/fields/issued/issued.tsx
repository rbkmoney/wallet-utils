import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';

export const Issued: React.SFC = () => (
    <div className={formGroup}>
        <Input
            placeholder='Когда выдан'
            mark={true}
            id='passport-issued-input'
            type='date'
        />
    </div>
);
