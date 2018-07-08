import { AbstractAction, TypeKeys } from 'app/actions';
import { DocumentType, LogicError, TokenizedInsurance, TokenizedPassport } from 'app/backend';
import { InsuranceFormValues, PassportFormValues } from 'app/state';

export interface SavePassportRequestedPayload {
    values: PassportFormValues;
    type: DocumentType;
}

export interface SaveInsuranceRequestedPayload {
    values: InsuranceFormValues;
    type: DocumentType;
}

type SaveInsuranceCompletedPayload = TokenizedInsurance;
type SavePassportCompletedPayload = TokenizedPassport;

export interface SavePassportRequested extends AbstractAction<SavePassportRequestedPayload> {
    type: TypeKeys.SAVE_PASSPORT_REQUESTED;
    payload: SavePassportRequestedPayload;
}

export interface SavePassportCompleted extends AbstractAction<SavePassportCompletedPayload> {
    type: TypeKeys.SAVE_PASSPORT_COMPLETED;
    payload: SavePassportCompletedPayload;
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

export interface SaveInsuranceCompleted extends AbstractAction<SaveInsuranceCompletedPayload> {
    type: TypeKeys.SAVE_INSURANCE_COMPLETED;
    payload: SaveInsuranceCompletedPayload;
}

export interface SaveInsuranceFailed extends AbstractAction<LogicError> {
    type: TypeKeys.SAVE_INSURANCE_FAILED;
    payload: LogicError;
}

export const saveInsurance = (payload: SaveInsuranceRequestedPayload): SaveInsuranceRequested => ({
    type: TypeKeys.SAVE_INSURANCE_REQUESTED,
    payload
});

export interface BindDocumentsRequested extends AbstractAction {
    type: TypeKeys.DOCUMENTS_BINDING_REQUESTED;
}

export interface BindDocumentsCompleted extends AbstractAction {
    type: TypeKeys.DOCUMENTS_BINDING_COMPLETED;
}

export interface BindDocumentsFailed extends AbstractAction<LogicError> {
    type: TypeKeys.DOCUMENTS_BINDING_FAILED;
    payload: LogicError;
}
