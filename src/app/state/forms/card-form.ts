import { RegisteredField } from 'redux-form';

export interface CardFormFields {
    cardNumber: RegisteredField;
    expDate: RegisteredField;
}

export interface CardFormValues {
    cardNumber: string;
    expDate: string;
}
