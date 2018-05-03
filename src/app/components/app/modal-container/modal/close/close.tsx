import * as React from 'react';
import * as styles from './close.scss';
import { Icon, IconType } from 'app/components/ui';

export const Close: React.SFC = () => (
    <div className={styles.close} >
        <Icon icon={IconType.cross}/>
    </div>
);
