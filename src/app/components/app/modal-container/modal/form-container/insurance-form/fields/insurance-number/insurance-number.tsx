import * as React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';
import { isError } from '../../../common-fields/error-predicate';
import { validateInsuranceNumber } from './validate-insurance-number';
import { formatInsuranceNumber } from './format-insurance-number';

type CustomInputType =  WrappedFieldProps | any;

const getCustomInput = (fieldProps: CustomInputType) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        placeholder='Номер СНИЛС'
        mark={true}
        id='insurance-number-input'
        type='text'
    />
);

export const InsuranceNumber: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='number'
            component={getCustomInput}
            validate={validateInsuranceNumber}
            format={formatInsuranceNumber}/>
    </div>
);
