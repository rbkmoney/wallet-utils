import * as React from 'react';
import { container, _hasError, radio, checkmark } from './radio-input.scss';
import * as cx from 'classnames';
import { Field } from 'redux-form';

export class Radio {
    readonly name: string;
    readonly value: string;
    readonly label: string;
}

export interface RadioInputProps {
    className?: string;
    values: ReadonlyArray<Radio>;
}

const renderFields = (data: Radio, i: number) => (
    <div className={radio} key={i}>
        <label htmlFor={data.value}>
            <Field
                name={data.name}
                component='input'
                type='radio'
                value={data.value}/>
            <span className={checkmark}/>
            {data.label}
        </label>
    </div>
);

export const RadioInput: React.SFC<RadioInputProps> = (props) => (
    <div className={cx(container, props.className, {
        [_hasError]: false
    })}>
        {props.values.map(renderFields)}
    </div>
);
