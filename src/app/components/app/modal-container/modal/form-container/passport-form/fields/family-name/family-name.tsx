import * as React from 'react';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';
import { Field, WrappedFieldProps } from 'redux-form';
import { isError } from '../../../common-fields/error-predicate';
import { validateFamilyName } from './validate-family-name';

type CustomInputType =  WrappedFieldProps | any;

const getCustomInput = (fieldProps: CustomInputType) => (
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

export const FamilyName: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='familyName'
            component={getCustomInput}
            validate={validateFamilyName}/>
    </div>
);
