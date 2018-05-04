import * as React from 'react';
import { Input } from 'app/components/app/modal-container/modal/form-container/input';
import { formGroup } from '../../../forms.scss';

export const PassportNumber: React.SFC = () => (
    <div className={formGroup}>
        <Input
            placeholder='Номер'
            mark={true}
            id='passport-number-input'
        />
    </div>
);
