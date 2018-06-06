import * as React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';
import { isError } from '../../../common-fields/error-predicate';

const getCustomInput = (fieldProps: WrappedFieldProps) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        placeholder='Когда выдан'
        mark={true}
        id='passport-issued-input'
        type='date'
    />
);

export const Issued: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='issued'
            component={getCustomInput}/>
    </div>
);
