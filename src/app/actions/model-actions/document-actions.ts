import { AbstractAction, TypeKeys } from 'app/actions';
import { DocumentType, LogicError } from 'app/backend';
import { InsuranceFormValues, PassportFormValues } from 'app/state';

export interface SavePassportRequestedPayload {
    values: PassportFormValues;
    type: DocumentType;
}

export interface SaveInsuranceRequestedPayload {
    values: InsuranceFormValues;
    type: DocumentType;
}

type SaveDocumentCompletedPayload = Document;

export interface SavePassportRequested extends AbstractAction<SavePassportRequestedPayload> {
    type: TypeKeys.SAVE_PASSPORT_REQUESTED;
    payload: SavePassportRequestedPayload;
}

export interface SavePassportCompleted extends AbstractAction<SaveDocumentCompletedPayload> {
    type: TypeKeys.SAVE_PASSPORT_COMPLETED;
    payload: SaveDocumentCompletedPayload;
}

export interface SavePassportFailed extends AbstractAction<LogicError> {
    type: TypeKeys.SAVE_PASSPORT_FAILED;
    payload: LogicError;
}

export const savePassport = (payload: SavePassportRequestedPayload): SavePassportRequested => ({
    type: TypeKeys.SAVE_PASSPORT_REQUESTED,
    payload
});

export interface SaveInsuranceRequested extends AbstractAction<SaveInsuranceRequestedPayload> {
    type: TypeKeys.SAVE_INSURANCE_REQUESTED;
    payload: SaveInsuranceRequestedPayload;
}

export interface SaveInsuranceCompleted extends AbstractAction<SaveDocumentCompletedPayload> {
    type: TypeKeys.SAVE_INSURANCE_COMPLETED;
    payload: SaveDocumentCompletedPayload;
}

export interface SaveInsuranceFailed extends AbstractAction<LogicError> {
    type: TypeKeys.SAVE_INSURANCE_FAILED;
    payload: LogicError;
}

export const saveInsurance = (payload: SaveInsuranceRequestedPayload): SaveInsuranceRequested => ({
    type: TypeKeys.SAVE_INSURANCE_REQUESTED,
    payload
});
