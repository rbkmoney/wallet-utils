import { call, CallEffect, put, PutEffect, SelectEffect } from 'redux-saga/effects';
import { GoToFormInfo, PassportSavingCompleted, PassportSavingFailed, SetViewInfoProcess, TypeKeys } from 'app/actions';
import { PassportFormValues } from 'app/state';
import { DocumentTypeEnum, saveDocument } from 'app/backend';

type SavePutEffect = PassportSavingCompleted | PassportSavingFailed | GoToFormInfo | SetViewInfoProcess;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

const transformPassportValues = (values: any) => {
    const result: any = {};
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            if (key === 'number') {
                result.series = values[key].slice(0, 4);
                result.number = values[key].slice(4, 10);
            } else {
                result[key] = values[key];
            }
        }
    }
    return result;
};

export function* savePassport(values: PassportFormValues, wapiEndpoint: string, accessToken: string): Iterator<SaveEffect> {
    try {
        const type = DocumentTypeEnum.RUSDomesticPassportData;
        const savedDocument = yield call(saveDocument, wapiEndpoint, accessToken, {
            ...transformPassportValues(values),
            type
        });
        yield put({
            type: TypeKeys.PASSPORT_SAVING_COMPLETED,
            payload: savedDocument
        } as PassportSavingCompleted);
        return savedDocument;
    } catch (e) {
        yield put({
            type: TypeKeys.PASSPORT_SAVING_FAILED,
            payload: e
        } as PassportSavingFailed);
    }
}
