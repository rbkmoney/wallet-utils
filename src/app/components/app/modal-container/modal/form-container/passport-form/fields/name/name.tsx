import * as React from 'react';
import { Input } from '../../../input';

export const Name: React.SFC = () => (
    <Input
        placeholder='Имя'
        mark={true}
        id='passport-name-input'
    />
);
