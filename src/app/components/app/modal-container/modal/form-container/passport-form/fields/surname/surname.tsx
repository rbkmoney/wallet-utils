import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';
import { Field, WrappedFieldProps } from 'redux-form';
import { isError } from '../../../common-fields/error-predicate';

const getCustomInput = (fieldProps: WrappedFieldProps) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        placeholder='Фамилия'
        mark={true}
        id='passport-surname-input'
        type='text'
    />
);

export const Surname: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='surname'
            component={getCustomInput}/>
    </div>
);
