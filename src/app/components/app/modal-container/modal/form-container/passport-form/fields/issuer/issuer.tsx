import * as React from 'react';
import { Input } from '../../../input';

export const Issuer: React.SFC = () => (
    <Input
        placeholder='Кем выдан'
        mark={true}
        id='passport-issuer-input'
    />
);
