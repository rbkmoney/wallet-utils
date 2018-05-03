import * as React from 'react';
import { Input } from '../../input';
import { IconType } from 'app/components/ui';

export const Phone: React.SFC = (props) => (
    <Input
        icon={IconType.phone}
        placeholder={'phone'}
        mark={true}
        type='tel'
        id='phone-input'
    />
);
