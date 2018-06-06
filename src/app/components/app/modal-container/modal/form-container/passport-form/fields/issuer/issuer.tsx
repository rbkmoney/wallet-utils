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
        placeholder='Кем выдан'
        mark={true}
        id='passport-issuer-input'
        type='text'
    />
);

export const Issuer: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='issuer'
            component={getCustomInput}/>
    </div>
);
