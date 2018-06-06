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
        placeholder='Место рождения'
        mark={true}
        id='passport-birthplace-input'
        type='text'
    />
);

export const BirthPlace: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='birthplace'
            component={getCustomInput}/>
    </div>
);
