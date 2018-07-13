import {
    DocumentsBindingRequested,
    InsuranceSavingCompleted,
    InsuranceSavingFailed,
    SetViewInfoProcess,
    TypeKeys
} from 'app/actions';
import { call, CallEffect, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { State } from 'app/state';
import { DocumentTypeEnum, saveDocument } from 'app/backend';

type SavePutEffect = InsuranceSavingCompleted | InsuranceSavingFailed | SetViewInfoProcess | DocumentsBindingRequested;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

export function* saveInsurance(): Iterator<SaveEffect> {
    try {
        const { config, values } = yield select((s: State) => ({
            config: s.config,
            values: s.form.insuranceForm.values
        }));
        const type = DocumentTypeEnum.RUSRetireeInsuranceCertificateData;
        const savedDocument = yield call(saveDocument, config.appConfig.wapiEndpoint, config.initConfig.token, {
            ...values,
            type
        });
        yield put({
            type: TypeKeys.INSURANCE_SAVING_COMPLETED,
            payload: savedDocument
        } as InsuranceSavingCompleted);
    } catch (e) {
        yield put({
            type: TypeKeys.INSURANCE_SAVING_FAILED,
            payload: e
        } as InsuranceSavingFailed);
    }
}
