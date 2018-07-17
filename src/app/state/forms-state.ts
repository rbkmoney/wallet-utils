import {
    CardFormFields,
    CardFormValues,
    InsuranceFormFields,
    InsuranceFormValues,
    PassportFormFields,
    PassportFormValues
} from './forms';

interface FormState<T, V> {
    registeredFields: T;
    values?: V;
}

export type PassportFormState = FormState<PassportFormFields, PassportFormValues>;

export type CardFormState = FormState<CardFormFields, CardFormValues>;

export type InsuranceFormState = FormState<InsuranceFormFields, InsuranceFormValues>;

export class FormsState {
    readonly passportForm: PassportFormState;
    readonly cardForm: CardFormState;
    readonly insuranceForm: InsuranceFormState;
}
