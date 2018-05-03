import * as React from 'react';
import { Input } from '../../../input';

export const Gender: React.SFC = () => (
    <Input
        placeholder='Пол'
        mark={true}
        id='passport-gender-input'
    />
);
