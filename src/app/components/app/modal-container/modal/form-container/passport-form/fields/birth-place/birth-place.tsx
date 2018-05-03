import * as React from 'react';
import { Input } from '../../../input';

export const BirthPlace: React.SFC = () => (
    <Input
        placeholder='Место рождения'
        mark={true}
        id='passport-birthplace-input'
    />
);
