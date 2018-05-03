import * as React from 'react';
import { Input } from '../../../input';

export const BirthDate: React.SFC = () => (
    <Input
        placeholder='Дата рождения'
        mark={true}
        id='passport-birthdate-input'
    />
);
