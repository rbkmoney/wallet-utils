import * as React from 'react';
import { container, _hasError, radio, checkmark } from './radio-input.scss';
import * as cx from 'classnames';

export class Radio {
    readonly name: string;
    readonly value: string;
    readonly label: string;
}

export interface RadioInputProps {
    className?: string;
    values: ReadonlyArray<Radio>;
}

const renderButtons = (data: Radio, i: number) => (
    <div className={radio} key={i}>
        <input type='radio' name={data.name} value={data.value} id={data.value}/>
        <span className={checkmark}/>
        <label htmlFor={data.value}>{data.label}</label>
    </div>

);

export const RadioInput: React.SFC<RadioInputProps> = (props) => (
    <div className={cx(container, props.className, {
        [_hasError]: false
    })}>
        {props.values.map(renderButtons)}
    </div>
);
