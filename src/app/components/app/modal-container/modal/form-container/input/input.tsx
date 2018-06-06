import * as React from 'react';
import * as cx from 'classnames';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import * as styles from './input.scss';
import { Marks } from './marks';
import { Icon, IconType } from 'app/components/ui';

export interface CustomProps {
    placeholder?: string;
    mark?: boolean; // TODO mark always true
    className?: string;
    type?: 'text' | 'number' | 'value' | 'tel' | 'email' | 'password' | 'date';
    id?: string;
    icon?: IconType;
    onInput?: React.FormEventHandler<HTMLInputElement>;
}

type InputProps = WrappedFieldInputProps & WrappedFieldMetaProps & CustomProps;

export const Input: React.SFC<InputProps> = (props) => (
    <div className={cx(styles.container, props.className, {
        [styles._hasError]: false
    })}>
        {props.icon ? <Icon className={styles.icon} icon={props.icon}/> : false}
        <input
            onChange={props.onChange}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            onDrop={props.onDrop}
            onDragStart={props.onDragStart}
            onInput={props.onInput}
            className={cx(styles.input, {
                [styles.mark]: props.mark,
                [styles._withIcon]: !!props.icon,
                [styles._withIconAndMark]: !!props.icon && props.mark
            })}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            id={props.id}
        />
        {props.mark ? <Marks active={false} pristine={false} error={false}/> : false}
    </div>
);
