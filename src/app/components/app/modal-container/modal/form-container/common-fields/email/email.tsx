import * as React from 'react';
import { Input } from '../../input';
import { IconType } from 'app/components/ui';

export const Email: React.SFC = () => (
    <Input
        icon={IconType.letter}
        placeholder={'Email'}
        mark={true}
        type='email'
        id='email-input'
    />
);
