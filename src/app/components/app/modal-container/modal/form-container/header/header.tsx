import * as React from 'react';
import * as formStyles from '../form-container.scss';

export interface HeaderProps {
    title: string;
}

export const Header: React.SFC<HeaderProps> = (props: HeaderProps) => (
    <div className={formStyles.header}>
        <div className={formStyles.title}>
            {props.title}
        </div>
    </div>
);
