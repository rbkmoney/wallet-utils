import { AbstractAction, TypeKeys } from 'app/actions';
import { DocumentTypeEnum, LogicError, TokenizedInsurance, TokenizedPassport } from 'app/backend';
import { InsuranceFormValues, PassportFormValues } from 'app/state';

export interface PassportSavingRequestedPayload {
    values: PassportFormValues;
    type: DocumentTypeEnum;
}

export interface InsuranceSavingRequestedPayload {
    values: InsuranceFormValues;
    type: DocumentTypeEnum;
}

type InsuranceSavingCompletedPayload = TokenizedInsurance;
type PassportSavingCompletedPayload = TokenizedPassport;

export interface PassportSavingRequested extends AbstractAction<PassportSavingRequestedPayload> {
    type: TypeKeys.PASSPORT_SAVING_REQUESTED;
    payload: PassportSavingRequestedPayload;
}

export interface PassportSavingCompleted extends AbstractAction<PassportSavingCompletedPayload> {
    type: TypeKeys.PASSPORT_SAVING_COMPLETED;
    payload: PassportSavingCompletedPayload;
}

export interface PassportSavingFailed extends AbstractAction<LogicError> {
    type: TypeKeys.PASSPORT_SAVING_FAILED;
    payload: LogicError;
}

export interface InsuranceSavingRequested extends AbstractAction<InsuranceSavingRequestedPayload> {
    type: TypeKeys.INSURANCE_SAVING_REQUESTED;
    payload: InsuranceSavingRequestedPayload;
}

export interface InsuranceSavingCompleted extends AbstractAction<InsuranceSavingCompletedPayload> {
    type: TypeKeys.INSURANCE_SAVING_COMPLETED;
    payload: InsuranceSavingCompletedPayload;
}

export interface InsuranceSavingFailed extends AbstractAction<LogicError> {
    type: TypeKeys.INSURANCE_SAVING_FAILED;
    payload: LogicError;
}

export interface DocumentsBindingRequested extends AbstractAction {
    type: TypeKeys.DOCUMENTS_BINDING_REQUESTED;
}

export interface DocumentsBindingCompleted extends AbstractAction {
    type: TypeKeys.DOCUMENTS_BINDING_COMPLETED;
}

export interface DocumentsBindingFailed extends AbstractAction<LogicError> {
    type: TypeKeys.DOCUMENTS_BINDING_FAILED;
    payload: LogicError;
}

export const bindDocuments = (): DocumentsBindingRequested => ({
    type: TypeKeys.DOCUMENTS_BINDING_REQUESTED
});
