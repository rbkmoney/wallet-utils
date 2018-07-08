import { RegisteredField } from 'redux-form';

export interface PassportFormFields {
    familyName: RegisteredField;
    firstName: RegisteredField;
    patronymic: RegisteredField;
    gender: RegisteredField;
    birthDate: RegisteredField;
    birthPlace: RegisteredField;
    number: RegisteredField;
    issuer: RegisteredField;
    issuerCode: RegisteredField;
    issued: RegisteredField;
}

export interface PassportFormValues {
    familyName: string;
    firstName: string;
    patronymic: string;
    gender: string;
    birthDate: string;
    birthPlace: string;
    number: string;
    issuer: string;
    issuerCode: string;
    issued: string;
}
