import { RegisteredField } from 'redux-form';

export interface PassportFormFields {
    surName: RegisteredField;
    name: RegisteredField;
    patronymic: RegisteredField;
    gender: RegisteredField;
    birthDate: RegisteredField;
    BirthPlace: RegisteredField;
    number: RegisteredField;
    issuer: RegisteredField;
    issued: RegisteredField;
}

export interface PassportFormValues {
    surName: string;
    name: string;
    patronymic: string;
    gender: string;
    birthDate: string;
    BirthPlace: string;
    number: string;
    issuer: string;
    issued: string;
}
