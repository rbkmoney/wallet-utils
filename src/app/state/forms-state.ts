import { PassportFormFields, PassportFormValues } from './forms';

interface FormState<T, V> {
    registeredFields: T;
    values?: V;
}

export type PassportFormState = FormState<PassportFormFields, PassportFormValues>;

export class FormsState {
    readonly passportForm: PassportFormState;
}
