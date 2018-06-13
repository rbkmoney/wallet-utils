import * as React from 'react';
import { RefObject } from 'react';
import * as cx from 'classnames';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import * as styles from './input.scss';
import { Marks } from './marks';
import { Icon, IconType } from 'app/components/ui';
import { isSafari } from 'app/utils/is-safari';

export enum InputType {
    text = 'text',
    number = 'number',
    value = 'value',
    tel = 'tel',
    email = 'email',
    password = 'password',
    date = 'date'
}

export interface CustomProps {
    placeholder?: string;
    mark?: boolean;
    className?: string;
    type?: InputType;
    id?: string;
    icon?: IconType;
    onInput?: React.FormEventHandler<HTMLInputElement>;
}

type InputProps = WrappedFieldInputProps & WrappedFieldMetaProps & CustomProps;

export class Input extends React.Component<InputProps> {
    private inputRef: RefObject<any>;

    constructor(props: InputProps) {
        super(props);
        this.inputRef = React.createRef();
    }

    typeWorker(type: InputType): InputType {
        if (type === InputType.date && this.inputRef.current) {
            if (!isSafari) {
                this.inputRef.current.onfocus = () => this.inputRef.current.type = InputType.date;
                this.inputRef.current.onblur = () => this.inputRef.current.type = InputType.text;
            }
            return InputType.text;
        } else {
            return type;
        }

    }

    render() {
        const props = this.props;
        return (
            <div className={cx(styles.container, props.className, {
                [styles._hasError]: props.error
            })}>
                {props.icon ? <Icon className={styles.icon} icon={props.icon}/> : false}
                <input
                    ref={this.inputRef}
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
                    type={this.typeWorker(props.type)}
                    value={props.value}
                    id={props.id}
                />
                {props.mark ? <Marks active={props.active} pristine={props.pristine} error={props.error}/> : false}
            </div>
        );
    }
}
