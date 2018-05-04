import * as React from 'react';
import { close } from './close.scss';
import { Icon, IconType } from 'app/components/ui';

export const Close: React.SFC = () => (
    <div className={close} >
        <Icon icon={IconType.cross}/>
    </div>
);
