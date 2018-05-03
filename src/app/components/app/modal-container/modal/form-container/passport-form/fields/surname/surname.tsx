import * as React from 'react';
import { Input } from '../../../input';

export const Surname: React.SFC = () => (
    <Input
        placeholder='Фамилия'
        mark={true}
        id='passport-surname-input'
    />
);
