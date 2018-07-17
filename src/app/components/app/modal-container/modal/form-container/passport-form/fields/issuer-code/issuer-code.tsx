import * as React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';
import { isError } from '../../../common-fields/error-predicate';
import { validateIssuerCode } from './validate-issuer-code';

type CustomInputType =  WrappedFieldProps | any;

const getCustomInput = (fieldProps: CustomInputType) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        placeholder='Код подразделения'
        mark={true}
        id='issuer-code-input'
        type='text'
    />
);

export const IssuerCode: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='issuerCode'
            component={getCustomInput}
            validate={validateIssuerCode}/>
    </div>
);
