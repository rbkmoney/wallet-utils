import * as React from 'react';
import * as styles from './input.scss';
import * as cx from 'classnames';
import { Marks } from './marks';

export interface InputProps {
    placeholder?: string;
    mark?: boolean; // TODO mark always true
    className?: string;
    type?: 'text' | 'number' | 'value' | 'tel' | 'email' | 'password' | 'date';
    id?: string;
}

export const Input: React.SFC<InputProps> = (props) => (
    <div className={cx(styles.container, props.className, {
        [styles._hasError]: false
    })}>
        <input
            className={cx(styles.input, {[styles.mark]: props.mark})}
            placeholder={props.placeholder}
            type={props.type}
            id={props.id}
        />
        {props.mark ? <Marks active={false} pristine={false} error={false}/> : false}
    </div>
);
