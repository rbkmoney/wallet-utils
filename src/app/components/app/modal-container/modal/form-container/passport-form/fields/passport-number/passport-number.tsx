import * as React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';
import { isError } from '../../../common-fields/error-predicate';

type CustomInputType =  WrappedFieldProps | any;

const getCustomInput = (fieldProps: CustomInputType) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        placeholder='Серия и номер'
        mark={true}
        id='passport-number-input'
        type='text'
    />
);

export const PassportNumber: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='number'
            component={getCustomInput}/>
    </div>
);
