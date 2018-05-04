import * as React from 'react';
import { Input } from '../../input';

export const Email: React.SFC = () => (
    <Input
        placeholder={'Email'}
        mark={true}
        type='email'
        id='email-input'
    />
);
