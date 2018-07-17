import { call, CallEffect, put, PutEffect, SelectEffect } from 'redux-saga/effects';
import {
    DocumentsBindingRequested,
    InsuranceSavingCompleted,
    InsuranceSavingFailed,
    SetViewInfoProcess,
    TypeKeys
} from 'app/actions';
import { InsuranceFormValues } from 'app/state';
import { DocumentTypeEnum, saveDocument } from 'app/backend';

type SavePutEffect = InsuranceSavingCompleted | InsuranceSavingFailed | SetViewInfoProcess | DocumentsBindingRequested;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

export function* saveInsurance(values: InsuranceFormValues, wapiEndpoint: string, accessToken: string): Iterator<SaveEffect> {
    try {
        const type = DocumentTypeEnum.RUSRetireeInsuranceCertificateData;
        const savedDocument = yield call(saveDocument, wapiEndpoint, accessToken, {
            ...values,
            type
        });
        yield put({
            type: TypeKeys.INSURANCE_SAVING_COMPLETED,
            payload: savedDocument
        } as InsuranceSavingCompleted);
        return savedDocument;
    } catch (e) {
        yield put({
            type: TypeKeys.INSURANCE_SAVING_FAILED,
            payload: e
        } as InsuranceSavingFailed);
    }
}
