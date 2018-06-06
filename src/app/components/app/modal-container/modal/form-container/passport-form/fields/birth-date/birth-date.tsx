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
        placeholder='Дата рождения'
        mark={true}
        id='passport-birthdate-input'
        type='date'
    />
);

export const BirthDate: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='birthdate'
            component={getCustomInput}/>
    </div>
);
