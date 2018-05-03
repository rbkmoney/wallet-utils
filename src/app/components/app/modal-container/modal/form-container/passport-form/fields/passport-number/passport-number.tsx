import * as React from 'react';
import { Input } from 'app/components/app/modal-container/modal/form-container/input';

export const PassportNumber: React.SFC = () => (
    <Input
        placeholder='Номер'
        mark={true}
        id='passport-number-input'
    />
);
