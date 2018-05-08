import * as React from 'react';
import { container, _hasError, radio } from './radio-input.scss';
import * as cx from 'classnames';

export class Radio {
    readonly name: string;
    readonly value: string;
    readonly label: string;
}

export interface InputProps {
    placeholder?: string;
    className?: string;
    values: ReadonlyArray<Radio>;
}

const renderButtons = (data: Radio, i: number) => (
    <div className={radio} key={i}>
        <input type='radio' name={data.name} value={data.value} id={data.value}/>
        <span/>
        <label htmlFor={data.value}>{data.label}</label>
    </div>

);

export const RadioInput: React.SFC<InputProps> = (props) => (
    <div className={cx(container, props.className, {
        [_hasError]: false
    })}>
        {props.values.map(renderButtons)}
    </div>
);
