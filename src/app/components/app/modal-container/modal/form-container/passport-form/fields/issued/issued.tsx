import * as React from 'react';
import { Input } from '../../../input';

export const Issued: React.SFC = () => (
    <Input
        placeholder='Когда выдан'
        mark={true}
        id='passport-issued-input'
    />
);
