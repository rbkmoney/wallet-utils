import * as React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import * as cx from 'classnames';
import { Input } from '../../../input';
import { formGroup } from '../../../forms.scss';
import { expiryInputContainer, inputContainer, numberInputContainer, _hasError } from './card-number.scss';
import { IconType } from 'app/components/ui';

import { CardTypeIcon } from '..';
import { isError } from '../../../common-fields/error-predicate';
import { formatCardNumber } from './format-card-number';
import { validateCardNumber } from './validate-card-number';
import { formatExpiry } from './format-expiry';
import { validateExpireDate } from './validate-expire-date';

type CustomInputType = WrappedFieldProps | any;

const getCustomCardNumberInput = (fieldProps: CustomInputType) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        placeholder='Номер карты'
        className={cx(numberInputContainer, {
            [_hasError]: isError(fieldProps.meta)
        })}
        id='card-number-input'
        icon={IconType.card}
        type='text'
        onInput={formatCardNumber}/>
);

const getCustomExpiryInput = (fieldProps: CustomInputType) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        className={cx(expiryInputContainer, {
            [_hasError]: isError(fieldProps.meta)
        })}
        placeholder='ММ/ГГ'
        type='tel'
        id='expire-date-input'
        onInput={formatExpiry}
    />
);

export const CardNumber: React.SFC = () => (
    <div className={formGroup}>
        <div className={inputContainer}>
            <CardTypeIcon/>
            <Field
                name='cardNumber'
                component={getCustomCardNumberInput}
                validate={validateCardNumber}/>
            <Field
                name='expDate'
                component={getCustomExpiryInput}
                validate={validateExpireDate}/>
        </div>
    </div>
);
