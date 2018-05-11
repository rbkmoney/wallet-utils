import * as React from 'react';
import { MouseEventHandler } from 'react';
import * as cx from 'classnames';
import { button, _primary, _default } from './button.scss';

type ButtonType = 'primary' | 'default';

export interface ButtonProps {
    style: ButtonType;
    type?: 'submit';
    children: React.ReactNode;
    className?: string;
    id?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const getClass = (type: ButtonType) => type === 'primary' ? _primary : _default;

export const Button: React.SFC<ButtonProps> = (props) => (
    <button type={props.type}
            onClick={props.onClick}
            className={cx(button, getClass(props.style), props.className)}
            id={props.id}>
        {props.children}
    </button>
);
