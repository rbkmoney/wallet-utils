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
        placeholder='Имя'
        mark={true}
        id='passport-name-input'
        type='text'
    />
);

export const Name: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='name'
            component={getCustomInput}/>
    </div>
);
