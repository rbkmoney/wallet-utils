import * as React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';
import { isError } from '../../../common-fields/error-predicate';
import { validateIssuedAt } from './validate-issued-at';

type CustomInputType =  WrappedFieldProps | any;

const getCustomInput = (fieldProps: CustomInputType) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        placeholder='Когда выдан'
        mark={true}
        id='passport-issuedat-input'
        type='date'
    />
);

export const IssuedAt: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='issuedAt'
            component={getCustomInput}
            validate={validateIssuedAt}/>
    </div>
);
