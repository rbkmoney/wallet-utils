import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';

export const Issuer: React.SFC = () => (
    <div className={formGroup}>
        <Input
            placeholder='Кем выдан'
            mark={true}
            id='passport-issuer-input'
        />
    </div>
);
