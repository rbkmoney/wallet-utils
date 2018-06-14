import { RegisteredField } from 'redux-form';

export interface CardFormFields {
    number: RegisteredField;
    month: RegisteredField;
    year: RegisteredField;
}

export interface CardFormValues {
    number: string;
    month: string;
    year: string;
}
