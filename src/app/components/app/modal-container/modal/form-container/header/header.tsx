import * as React from 'react';
import { title, header } from '../form-container.scss';

export interface HeaderProps {
    title: string;
}

export const Header: React.SFC<HeaderProps> = (props: HeaderProps) => (
    <div className={header}>
        <div className={title}>
            {props.title}
        </div>
    </div>
);
