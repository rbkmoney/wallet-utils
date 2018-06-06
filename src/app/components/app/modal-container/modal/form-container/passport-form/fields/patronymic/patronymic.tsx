import * as React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';
import { isError } from '../../../common-fields/error-predicate';
import { validatePatronymic } from './validate-patronymic';

type CustomInputType =  WrappedFieldProps | any;

const getCustomInput = (fieldProps: CustomInputType) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        placeholder='Отчество'
        mark={true}
        id='passport-patronymic-input'
        type='text'
    />
);

export const Patronymic: React.SFC = () => (
    <div className={formGroup}>
        <Field
            name='patronymic'
            component={getCustomInput}
            validate={validatePatronymic}/>
    </div>
);
